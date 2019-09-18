
describe("cost-comparisons - assembleDataSet", function() {

    let costData = [
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "adult_cleaning", "cost": 105},
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "composite_filling", "cost": 140},
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "extraction", "cost": 110},
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "root_canal", "cost": 725},
        {"name": "San Diego Smile Dentistry", "city": "San Diego", "procedure": "porcelain_crown", "cost": 850},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "adult_cleaning", "cost": 40},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "composite_filling", "cost": 40},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "extraction", "cost": 90},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "root_canal", "cost": 250},
        {"name": "Advanced Smiles Dentistry", "city": "Tijuana", "procedure": "porcelain_crown", "cost": 450},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "adult_cleaning", "cost": 95},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "composite_filling", "cost": 120},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "extraction", "cost": 110},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "root_canal", "cost": 765},
        {"name": "Great Smile Dental", "city": "San Diego", "procedure": "porcelain_crown", "cost": 1105},
        {"name": "Dental Express", "city": "San Diego", "procedure": "adult_cleaning", "cost": 100},
        {"name": "Dental Express", "city": "San Diego", "procedure": "composite_filling", "cost": 120},
        {"name": "Dental Express", "city": "San Diego", "procedure": "extraction", "cost": 125},
        {"name": "Dental Express", "city": "San Diego", "procedure": "root_canal", "cost": 785},
        {"name": "Dental Express", "city": "San Diego", "procedure": "porcelain_crown", "cost": 950},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "adult_cleaning", "cost": 45},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "composite_filling", "cost": 75},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "extraction", "cost": 80},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "root_canal", "cost": 400},
        {"name": "Smile Builders", "city": "Tijuana", "procedure": "porcelain_crown", "cost": 550},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "adult_cleaning", "cost": 40},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "composite_filling", "cost": 65},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "extraction", "cost": 85},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "root_canal", "cost": 260},
        {"name": "Dr Ignacio de la Vega", "city": "Tijuana", "procedure": "porcelain_crown", "cost": 475}
    ]

    it("should return [100, 42, 127, 60, 115, 85, 968, 492, 758, 303]", function() {
        let result = assembleDataSet(costData);
        expect(result).toEqual([100, 42, 127, 60, 115, 85, 968, 492, 758, 303]);
    });

    it("should not return [100, 42, 127, 60, 758, 303]", function() {
        let result = assembleDataSet(costData);
        expect(result).not.toEqual([100, 42, 127, 60, 758, 303]);
    });
});