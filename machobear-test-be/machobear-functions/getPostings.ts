import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { db } from './lib/db';
import { sql } from 'kysely';
import { objectToCamel } from 'ts-case-convert';
import { jsonObjectFrom } from 'kysely/helpers/mysql';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log('EVENT: \n' + JSON.stringify(event, null, 2));

        const username = event?.headers?.['username'];

        const query = db
            .selectFrom('postings')
            .selectAll()
            .select((eb) => {
                return jsonObjectFrom(
                    eb
                        .selectFrom('users as u')
                        .select(['u.id', 'u.name', 'u.avatar_image_url'])
                        .whereRef('u.id', '=', eb.ref('postings.created_by')),
                ).as('created_by_user');
            });

        if (username) {
            query.select([
                sql<string>`CASE EXISTS (SELECT 1 FROM bookmarks WHERE bookmarks.posting_id = postings.id AND bookmarks.username = ${username}) THEN True ELSE False END`.as(
                    'is_bookmarked',
                ),
            ]);
        }

        const postingsRaw = await query.limit(10).execute();

        let postings = objectToCamel(postingsRaw);

        postings = postings.map((p) => {
            p.createdBy = p.createdByUser;
            // @ts-expect-error TODO: add database types
            delete p.createdByUser;
            return p;
        });

        return {
            statusCode: 200,
            body: JSON.stringify(postings),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
