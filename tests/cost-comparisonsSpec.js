
describe("cost-comparisons - assembleDataSet", function() {

    let sampleData = [
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Adult Cleaning", "cost": 105},
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Composite Filling", "cost": 140},
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Extraction", "cost": 110},
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Root Canal", "cost": 725},
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Porcelain Crown", "cost": 850},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Adult Cleaning", "cost": 40},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Composite Filling", "cost": 40},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Extraction", "cost": 90},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Root Canal", "cost": 250},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Porcelain Crown", "cost": 450},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Adult Cleaning", "cost": 95},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Composite Filling", "cost": 120},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Extraction", "cost": 110},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Root Canal", "cost": 765},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Porcelain Crown", "cost": 1105},
        {"name": "Dental Express", "city": "San Diego", "procedure": "Adult Cleaning", "cost": 100},
        {"name": "Dental Express", "city": "San Diego", "procedure": "Composite Filling", "cost": 120},
        {"name": "Dental Express", "city": "San Diego", "procedure": "Extraction", "cost": 125},
        {"name": "Dental Express", "city": "San Diego", "procedure": "Root Canal", "cost": 785},
        {"name": "Dental Express", "city": "San Diego", "procedure": "Porcelain Crown", "cost": 950},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "Adult Cleaning", "cost": 45},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "Composite Filling", "cost": 75},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "Extraction", "cost": 80},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "Root Canal", "cost": 400},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "Porcelain Crown", "cost": 550},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Adult Cleaning", "cost": 40},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Composite Filling", "cost": 65},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Extraction", "cost": 85},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Root Canal", "cost": 260},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Porcelain Crown", "cost": 475}
    ];

    it("should return a properly formatted JSON array", function() {
        let result = assembleOverlayDataSet(sampleData);
        expect(result).toEqual([{"procedure":"Adult Cleaning", "sd_average":100, "tj_average":42},
            {"procedure":"Composite Filling", "sd_average":127, "tj_average":60},
            {"procedure":"Extraction", "sd_average":115, "tj_average":85},
            {"procedure":"Root Canal", "sd_average":758, "tj_average":303},
            {"procedure":"Porcelain Crown", "sd_average":968, "tj_average":492}]);
    });

    it("should return a JSON array length of 5", function() {
        let result = assembleOverlayDataSet(sampleData);
        expect(result.length).toBe(5);
    });

    it("should return two JSON arrays with a length of 3 each", function() {
        let result = sortDataByCity(sampleData);
        expect(result[0].length).toBe(15);
        expect(result[1].length).toBe(15);
    });

    it("should return two properly formatted JSON arrays", function() {
        let result = sortDataByCity(sampleData);
        expect(result[0]).toEqual([
            {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Adult Cleaning", "cost": 105},
            {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Composite Filling", "cost": 140},
            {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Extraction", "cost": 110},
            {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Root Canal", "cost": 725},
            {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "Porcelain Crown", "cost": 850},
            {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Adult Cleaning", "cost": 95},
            {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Composite Filling", "cost": 120},
            {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Extraction", "cost": 110},
            {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Root Canal", "cost": 765},
            {"name": "Great Smile Dental", "city": "San Diego", "procedure": "Porcelain Crown", "cost": 1105},
            {"name": "Dental Express", "city": "San Diego", "procedure": "Adult Cleaning", "cost": 100},
            {"name": "Dental Express", "city": "San Diego", "procedure": "Composite Filling", "cost": 120},
            {"name": "Dental Express", "city": "San Diego", "procedure": "Extraction", "cost": 125},
            {"name": "Dental Express", "city": "San Diego", "procedure": "Root Canal", "cost": 785},
            {"name": "Dental Express", "city": "San Diego", "procedure": "Porcelain Crown", "cost": 950}
        ]);
        expect(result[1]).toEqual([
            {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Adult Cleaning", "cost": 40},
            {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Composite Filling", "cost": 40},
            {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Extraction", "cost": 90},
            {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Root Canal", "cost": 250},
            {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "Porcelain Crown", "cost": 450},
            {"name": "Smile Builders", "city": "Tijuana", "procedure": "Adult Cleaning", "cost": 45},
            {"name": "Smile Builders", "city": "Tijuana", "procedure": "Composite Filling", "cost": 75},
            {"name": "Smile Builders", "city": "Tijuana", "procedure": "Extraction", "cost": 80},
            {"name": "Smile Builders", "city": "Tijuana", "procedure": "Root Canal", "cost": 400},
            {"name": "Smile Builders", "city": "Tijuana", "procedure": "Porcelain Crown", "cost": 550},
            {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Adult Cleaning", "cost": 40},
            {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Composite Filling", "cost": 65},
            {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Extraction", "cost": 85},
            {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Root Canal", "cost": 260},
            {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "Porcelain Crown", "cost": 475}
        ])
    });

});