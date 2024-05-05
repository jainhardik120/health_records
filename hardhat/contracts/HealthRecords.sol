// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HealthRecords {
    struct MedicalRecord {
        address patient;
        uint256 creationTime;
        string metahash;
        address creator;
        string fileName;
    }

    struct SharedRecord {
        address patient;
        uint256 creationTime;
        int256 expiryTime;
        string metahash;
    }

    mapping(address => MedicalRecord[]) patientRecords;

    mapping(address => SharedRecord[]) sharedRecords;

    function createMedicalRecord(
        address _patient,
        string memory hash,
        string memory fileName
    ) public {
        MedicalRecord memory newRecord;
        newRecord.patient = _patient;
        newRecord.creationTime = block.timestamp;
        newRecord.metahash = hash;
        newRecord.creator = msg.sender;
        newRecord.fileName = fileName;
        patientRecords[_patient].push(newRecord);
    }

    function createRecordCopy(
        address _doctor,
        string memory metahash,
        int256 expiryTime
    ) public {
        SharedRecord memory newRecord;
        newRecord.patient = msg.sender;
        newRecord.creationTime = block.timestamp;
        newRecord.expiryTime = expiryTime;
        newRecord.metahash = metahash;
        sharedRecords[_doctor].push(newRecord);
    }

    function getValidRecords() public view returns (MedicalRecord[] memory) {
        return patientRecords[msg.sender];
    }

    function getValidSharedRecords() public view returns (SharedRecord[] memory) {
        SharedRecord[] memory records = sharedRecords[msg.sender];
        SharedRecord[] memory validRecords;
        uint256 validCount = 0;
        for (uint256 i = 0; i < records.length; i++) {
            SharedRecord memory record = records[i];
            uint256 currentTime = block.timestamp;
            if (
                (uint256(record.expiryTime) + record.creationTime) > currentTime
            ) {
                validCount++;
            }
        }
        validRecords = new SharedRecord[](validCount);
        validCount = 0;
        for (uint256 i = 0; i < records.length; i++) {
            SharedRecord memory record = records[i];
            uint256 currentTime = block.timestamp;
            if (
                (uint256(record.expiryTime) + record.creationTime) > currentTime
            ) {
                validRecords[validCount] = record;
                validCount++;
            }
        }
        return validRecords;
    }
}
