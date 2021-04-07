const mongoose = require('mongoose');
const getLocales = require('../utils/getLocales');

let GuildModel = mongoose.model(
    'guild_settings',
    new mongoose.Schema(
        {
            guildID: {
                type: String,
                required: true,
                unique: true,
                index: true,
            },
            locale: String | 'en',
        },
        { _id: false }
    )
);

GuildModel.setProps = async function (guildID, props) {
    return await this.findOneAndUpdate(
        { guildID: guildID },
        { $set: props },
        { new: true }
    );
};

GuildModel.getProps = function (guildID) {
    return GuildModel.findOne({ guildID: guildID }).exec();
};

module.exports = GuildModel;