class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // search a room by location, it search from address string
    search() {
        const location = this.queryStr.location ? {
            address: {
                $regex: this.queryStr.location,
                $options: 'i'
            }
        } : {}

        console.log(location)

        this.query = this.query.find({ ...location })
        return this;
    }

    // search by category
    filter() {
        const queryCopy = { ...this.queryStr}

        // remove fields from query
        const removeFields = ['location']
        removeFields.forEach(el => delete queryCopy[el])

        this.query = this.query.find(queryCopy);
        return this;
    }
}

export default APIFeatures