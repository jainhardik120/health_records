// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HealthRecords {
    struct MedicalRecord {
        address patient;
        uint256 creationTime;
        int256 expiryTime;
        string metahash;
    }

    mapping(address => MedicalRecord[]) map;

    function createMedicalRecord(
        address _patient,
        string memory metahash
    ) public {
        MedicalRecord memory newRecord;
        newRecord.patient = _patient;
        newRecord.creationTime = block.timestamp;
        newRecord.expiryTime = -1;
        newRecord.metahash = metahash;
        map[_patient].push(newRecord);
    }

    function createRecordCopy(
        address _doctor,
        string memory metahash,
        int256 expiryTime
    ) public {
        MedicalRecord memory newRecord;
        newRecord.patient = msg.sender;
        newRecord.creationTime = block.timestamp;
        newRecord.expiryTime = expiryTime;
        newRecord.metahash = metahash;
        map[_doctor].push(newRecord);
    }

    function getValidRecords(
        address _address
    ) public view returns (MedicalRecord[] memory) {
        MedicalRecord[] memory records = map[_address];
        MedicalRecord[] memory validRecords;
        uint256 validCount = 0;
        for (uint256 i = 0; i < records.length; i++) {
            MedicalRecord memory record = records[i];
            uint256 currentTime = block.timestamp;
            if (
                record.expiryTime == -1 ||
                (uint256(record.expiryTime) + record.creationTime) > currentTime
            ) {
                validCount++;
            }
        }
        validRecords = new MedicalRecord[](validCount);
        validCount = 0;
        for (uint256 i = 0; i < records.length; i++) {
            MedicalRecord memory record = records[i];
            uint256 currentTime = block.timestamp;
            if (
                record.expiryTime == -1 ||
                (uint256(record.expiryTime) + record.creationTime) > currentTime
            ) {
                validRecords[validCount] = record;
                validCount++;
            }
        }
        return validRecords;
    }
}
