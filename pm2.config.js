module.exports = {
    apps: [
        {
            name: "doan-api",
            script: "index.js",
            exec_mode: "cluster",
            error_file: "/var/temp/doan-api/error-api.log",
            max_restarts: 10,
            restart_delay: 1000,
            env_production: {
                "NODE_ENV": "production",
            },
            env_development: {
                "NODE_ENV": "development",
            },
        }
    ]
}