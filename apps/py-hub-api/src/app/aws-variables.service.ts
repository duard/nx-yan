import * as AWS from 'aws-sdk';

let tokenCount = 1;
export class AwsVariablesService {
  static async getVARs() {
    console.log(1, 'iniciando...');
    const params = await this.getData();
    console.log(2, 'fim.\n');
    return params;
  }

  static async getData(bag = [], NextToken = null) {
    const ssm = new AWS.SSM();

    const { SSM_PATH, NODE_ENV } = process.env;
    const prefix = `${SSM_PATH}/${NODE_ENV}/`;
    console.log('::: SSM: Loading environment variables :::', tokenCount++);

    const params = await ssm
      .getParametersByPath({ Path: prefix, WithDecryption: true, NextToken })
      .promise();

    // console.log(params);
    if (params.Parameters) bag = [...bag, ...params.Parameters];
    if (params.NextToken) return await this.getData(bag, params.NextToken);

    const parameters = new Promise((resolve) => {
      const parametersBag = {};

      for (const environment of bag) {
        parametersBag[environment.Name.replace(prefix, '')] = environment.Value;
      }

      console.log(`::: SSM: Loading environment variables :::`, 'resolvido');

      // resolve(Promise.resolve(parametersBag));
      resolve(parametersBag);
    });

    return parameters;
  }
}
