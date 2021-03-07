import * as AWS from 'aws-sdk';
import { config } from 'dotenv';

config();

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
    console.log('::: SSM: Loading environment variables :::', 1);

    const params = await ssm
      .getParametersByPath({ Path: prefix, WithDecryption: true, NextToken })
      .promise();

    // console.log(params);
    if (params.Parameters) bag = [...bag, ...params.Parameters];
    if (params.NextToken) return await this.getData(bag, params.NextToken);
    // return this.getData();
    // Return new promise
    return new Promise(function (resolve) {
      const parametersBag = {};

      for (const environment of bag) {
        parametersBag[environment.Name.replace(prefix, '')] = environment.Value;
      }

      // console.log(`::: SSM: Loading environment variables :::`, bag);

      resolve(Promise.resolve(parametersBag));
    });
  }
}
