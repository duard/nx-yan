// import { getSecretValues } from '@nx-yandeh/api-shared';
import * as AWS from 'aws-sdk';

let tokenCount = 1;

export class AwsVariablesService {
  static async getVARs() {
    const params = await this.getData();
    return params;
  }

  static async getData(bag = [], NextToken = null) {
    const ssm = new AWS.SSM();

    const { SSM_PATH, NODE_ENV } = process.env;
    const prefix = `${SSM_PATH}/${NODE_ENV}/`;

    const secretId = `${prefix}ALPE_CEDENTE_CNPJ`;
    const secretByPath = 'development';
    const keys = [];

    console.log(
      '::: SSM: Loading environment variables :::',
      secretId,
      secretByPath,
      tokenCount++
    );

    const params = await ssm
      .getParametersByPath({ Path: prefix, WithDecryption: true, NextToken })
      .promise();

    // const result = await getSecretValues(secretByPath)(...keys);
    // console.log('=> result', result);

    if (params.Parameters) bag = [...bag, ...params.Parameters];
    if (params.NextToken) return await this.getData(bag, params.NextToken);

    const parameters = new Promise((resolve) => {
      const parametersBag = {};

      for (const environment of bag) {
        // console.log(environment);
        parametersBag[environment.Name.replace(prefix, '')] = environment.Value;
      }

      resolve(parametersBag);
    });

    console.log(params);

    const data = await ssm
      .getParameters({
        WithDecryption: true,
        Names: [`/hub-yandeh/environments/development/PROJECT_ID`],
      })
      .promise();

    const response = {
      statusCode: 200,
      body: data,
    };

    console.log(`/hub-yandeh/environments/development/PROJECT_ID`, data);

    return parameters;
  }
}
