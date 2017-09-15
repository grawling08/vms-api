/*jshint camelcase: false */

'use strict';

module.exports = {
    env: 'development',
    db_host: process.env.DB_HOST || 'localhost',
    db_user: process.env.DB_USER || 'root',
    db_password: process.env.DB_PASSWORD || 'admin',
    db_name: 'vms',
    db_port: 3306,
    port: 3000, // PLEASE DONT REMOVE 'process.env.PORT'
    ip: process.env.IP,
    api_host_url: process.env.API_HOST_URL || 'http://localhost:3000',
    frontend_host_url: process.env.FRONTEND_HOST_URL || 'http://localhost:9004',
    frontend_portal_host_url: process.env.FRONTEND_HOST_URL || 'http://localhost:9003',
    api_version: process.env.API_VERSION || '/api/v1',
    sync_version: process.env.API_VERSION || '/sync/v1',
    app_version: process.env.APP_VERSION || '/v1',
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '',
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || '',
    LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || '',
    TWITTER_KEY: process.env.TWITTER_KEY || '',
    TWITTER_SECRET: process.env.TWITTER_SECRET || '',
    app_secretkey: 'grawling'
};
