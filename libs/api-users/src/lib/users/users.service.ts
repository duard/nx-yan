import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private db: Db
  ) {}

  async getUsers(params): Promise<any[]> {
    const { limit, page, sort } = params;

    const usersPaginationPipeline = (
      filter = {},
      skip = 0,
      limit = 10,
      sort = {}
    ) => [
      {
        $lookup: {
          from: 'segments',
          localField: 'segment',
          foreignField: '_id',
          as: 'segments',
        },
      },
      {
        $lookup: {
          from: 'products',
          localField: 'profile.products.product',
          foreignField: '_id',
          as: 'products',
        },
      },
      {
        $lookup: {
          from: 'clients',
          localField: 'profile.clients.client',
          foreignField: '_id',
          as: 'clients',
        },
      },
      {
        $lookup: {
          from: 'customers',
          localField: 'profile.customers',
          foreignField: '_id',
          as: 'customers',
        },
      },

      {
        $match: {
          ...filter,
          active: { $in: [true, null] },
          deleted: { $in: [false, null] },
        },
      },
      { $sort: { ...sort, created_at: -1 } },
      {
        $project: {
          _id: 1,
          name: 1,
          segments: 1,
          keycloak: 1,
          username: 1,
          email: 1,
          token: 1,
          custom_attrs: 1,
          'profile.products.profile': 1,
          'profile.products._id': 1,
          'profile.products.product': { $arrayElemAt: ['$products', 0] },
          'profile.clients.roles': 1,
          'profile.clients._id': 1,
          'profile.clients.client': { $arrayElemAt: ['$clients', 0] },
          'profile.customers': { $arrayElemAt: ['$customers', 0] },
          deleted: 1,
          active: 1,
          created_at: 1,
          updated_at: 1,
          __v: 1,
        },
      },
      {
        $facet: {
          total: [
            {
              $count: 'created_at',
            },
          ],
          result: [
            {
              $addFields: {
                _id: '$_id',
              },
            },
          ],
        },
      },
      { $unwind: '$total' },
      {
        $project: {
          result: {
            $slice: [
              '$result',
              skip,
              {
                $ifNull: [limit, '$total.created_at'],
              },
            ],
          },
          meta: {
            total: '$total.created_at',
            limit: { $literal: limit },
            page: { $literal: skip / limit + 1 },
            pages: {
              $ceil: {
                $divide: ['$total.created_at', limit],
              },
            },
          },
        },
      },
    ];

    const skip = limit * page - limit;
    const executePagination = async () => {
      console.log('=> buscando dados', skip, limit, sort);
      return this.db
        .collection('users')
        .aggregate(
          usersPaginationPipeline({}, Number(skip), Number(limit), sort)
        );
    };
    const exec = await executePagination();
    console.log(exec);
    return exec.toArray();
  }

  getData(): { message: string } {
    return { message: 'Welcome to py-hub-api!' };
  }
}
