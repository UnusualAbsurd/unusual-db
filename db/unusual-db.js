const mongoose = require('mongoose')

class unusualdb {
    schema = mongoose.model(`unusual-db`, new mongoose.Schema({
        key: String,
        value: mongoose.SchemaTypes.Mixed
    }))

    constructor(srv) {

        this.srv = srv;

        if (mongoose.connection.readyState !== 1) {
            if (!srv) throw new Error('You must provide a valid MongoDB SRV')
            if (srv) {

                if (typeof srv !== 'string') throw new Error('Mongoose SRV must be a string!')
                mongoose.connect(srv).catch((err) => console.log(err))
            }
        }

    }

    /**
     * @method
     * @param key Key is the query that we will find through the model so we can get the value!
     * @param value The value that will be get using the key
     * @description Saves or Create the data in mongoDB
     * @example <unusualdb>.set('model 1', 'This is the value')
     */
    set(key, value) {
        if (!key || !value) return;
        this.schema.findOne({ key }, async (err, data) => {
            if (err) return new Error(err);
            if (data) {
                data.value = value
            } else if (!data) {
                data = new this.schema({ key, value }).save();
            }
        })
    }
    /**
     * @method
     * @param key The key that you want to query the db with
     * @description Get the value of a mongodb document using the key
     * @example <unusualdb>.find('KEY_1')
     */
    async find(key) {
        if (!key) return;
        this.finding = await this.schema.findOne({key})
        return this.finding.value;
    }
    /**
     * @method
     * @param key The key that you want to delete the value
     * @description Deletes data from the mongodb model
     * @example <unusualdb>.delete('KEY_1')
     */
    delete(key) {
        if (!key) return;
        if (key) {
            this.schema.findOne({ key }, async (err, data) => {
                if (err) throw new Error(err)
                if (data) {
                    data.delete()
                }
            })
        }
    }
    /**
     * @method
     * @param key The key that you want to push the data to
     * @description Push a value / aata into an array using a key
     * @example <unusualdb>.push(`KEY_1`, [value, value1]);
     */
    push(key, ...arrayValue) {
        const data = this.schema.findOne({key});
        if(!data) return;
        const values = arrayValue.flat();
        if(!Array.isArray(data)) throw new Error(`You can't push datas into a ${typeof data} value field!`);

        data.push(arrayValue);
        this.schema.findOne({ key }, async(err, res) => {
            res.value = [...res.value, ...values]
            res.save();
        })
    }
}

module.exports = { unusualdb };