import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { HealthRecords } from "../typechain-types";
import { AddressLike, ContractRunner } from "ethers";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("HealthRecords", function () {
  let healthRecords: HealthRecords, owner: AddressLike | ContractRunner, otherAccount: AddressLike | ContractRunner, otherAccount2: AddressLike | ContractRunner;

  async function deployContract() {
    return await ethers.deployContract("HealthRecords");
  }

  this.beforeEach(async () => {
    healthRecords = await loadFixture(deployContract);
    [owner, otherAccount, otherAccount2] = await ethers.getSigners();
  });

  it("should create a medical record", async function () {
    const hash = "dummy_hash";
    const fileName = "medical_report.pdf";
    await healthRecords.createMedicalRecord(otherAccount as AddressLike, hash, fileName);

    const patientRecords = await healthRecords.connect(otherAccount as ContractRunner).getValidRecords();

    expect(patientRecords).to.have.lengthOf(1);
    expect(patientRecords[0].patient).to.equal(otherAccount);
    expect(patientRecords[0].metahash).to.equal(hash);
    expect(patientRecords[0].creator).to.equal(owner);
    expect(patientRecords[0].fileName).to.equal(fileName);
  });

  it("should create multiple medical records", async function () {
    const hash1 = "dummy_hash1";
    const fileName1 = "medical_report_1.pdf";
    await healthRecords.createMedicalRecord(otherAccount as AddressLike, hash1, fileName1);

    const hash2 = "dummy_hash2";
    const fileName2 = "medical_report_2.pdf";
    await healthRecords.createMedicalRecord(otherAccount as AddressLike, hash2, fileName2);

    const patientRecords = await healthRecords.connect(otherAccount as ContractRunner).getValidRecords();

    expect(patientRecords).to.have.lengthOf(2);
  });

  it("should not return expired shared records", async function () {
    const expiredHash = "expired_hash";
    const expiredExpiryTime = 1000;
    await healthRecords.createRecordCopy(otherAccount as AddressLike, expiredHash, expiredExpiryTime);
    await time.increase(1001);
    const validRecords = await healthRecords.connect(otherAccount as ContractRunner).getValidSharedRecords();
    expect(validRecords.length).to.equal(0);
  });

  it("should return no valid shared records when none exist", async function () {
    const validRecords = await healthRecords.connect(otherAccount as ContractRunner).getValidSharedRecords();
    expect(validRecords.length).to.equal(0);
  });

  it("should return no medical records when none exist", async function () {
    const patientRecords = await healthRecords.connect(otherAccount as ContractRunner).getValidRecords();
    expect(patientRecords.length).to.equal(0);
  });

  describe("should create shared records and check validity at different time intervals", async function () {

    this.beforeEach(async () => {
      const hash1 = "dummy_hash1";
      const hash2 = "dummy_hash2";
      await healthRecords.createRecordCopy(otherAccount as AddressLike, hash1, 1000);
      await healthRecords.createRecordCopy(otherAccount as AddressLike, hash2, 2000);
    })
    async function checkValidity(expectedSize: number) {
      const validRecords = await healthRecords.connect(otherAccount as ContractRunner).getValidSharedRecords();
      expect(validRecords.length).to.equal(expectedSize);
    }

    it("Check after 0 Time", async function () {
      await checkValidity(2);
    });

    it("Check after 500 Time", async function () {
      await time.increase(500);
      await checkValidity(2);
    });

    it("Check after 900 Time", async function () {
      await time.increase(900);
      await checkValidity(2);
    });

    it("Check after 1100 Time", async function () {
      await time.increase(1100);
      await checkValidity(1);
    });

    it("Check after 1900 Time", async function () {
      await time.increase(1900);
      await checkValidity(1);
    });

    it("Check after 2100 Time", async function () {
      await time.increase(2100);
      await checkValidity(0);
    });
  });
});