import _ from 'lodash';

type Props = {
    fields: string[],
    object: any
}

export class DataUtil {
    static GetSpecificDataFromObject({ fields, object }: Props) {
        return _.pick(object, fields);
    }
}