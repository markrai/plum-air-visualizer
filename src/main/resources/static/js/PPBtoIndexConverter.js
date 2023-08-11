class PPBtoIndexConverter {
    constructor() {
        this.indexRanges = [
            [0, 50],
            [51, 100],
            [101, 150],
            [151, 200],
            [301, 500]
        ];

        this.ppbRanges = [
            [0, 220],
            [221, 660],
            [661, 1430],
            [1431, 2200],
            [3301, 5500]
        ];
    }

    extrapolateRanges(maxPPB) {
        let indexIncrement = 200;
        let ppbIncrement = this.ppbRanges[this.ppbRanges.length - 1][1] - this.ppbRanges[this.ppbRanges.length - 1][0];

        while (this.ppbRanges[this.ppbRanges.length - 1][1] < maxPPB) {
            let lastIndexRange = this.indexRanges[this.indexRanges.length - 1];
            let lastPpbRange = this.ppbRanges[this.ppbRanges.length - 1];

            let newIndexRange = [lastIndexRange[1] + 1, lastIndexRange[1] + indexIncrement];
            let newPpbRange = [lastPpbRange[1] + 1, lastPpbRange[1] + ppbIncrement];

            this.indexRanges.push(newIndexRange);
            this.ppbRanges.push(newPpbRange);
        }
    }

    ppbToIndex(ppbValue) {
        for (let i = 0; i < this.ppbRanges.length; i++) {
            if (ppbValue >= this.ppbRanges[i][0] && ppbValue <= this.ppbRanges[i][1]) {
                return this.indexRanges[i][0];
            }
        }
        return null; // Return null if the PPB value doesn't fit in any range
    }
}

export default PPBtoIndexConverter;
