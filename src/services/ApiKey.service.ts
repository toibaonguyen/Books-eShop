import ApiKeyModel from "../models/ApiKey.keys.model";

export class ApiKeyService {
    public async FindApiKeyByKey(key: string) {
        try {
            return await ApiKeyModel.findOne({ key: key }).lean();
        }
        catch (e) {
            throw e;
        }
    }
}