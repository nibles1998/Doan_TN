const fs = require("fs"),
    path = require("path")
const express = require('express');
const bodyParser = require('body-parser');
const App = {}, ignorePath = ["node_modules", ".git"];
const cors = require('cors');
const User = require('./models/user').model;
const UserRole = require('./models/userRole').model;
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

const isIgnore = function (path) {
    return ignorePath.indexOf(path) !== -1;
}

const requireAll = async function (srcPath, app, obj) {

    let stat, curPath, rKey;
    const dirs = ['config', 'models', 'controllers', 'routes'];
    for (let index = 0; index < dirs.length; index++) {
        const f = dirs[index];
        if (f === "index.js") {
            return;
        }
        curPath = path.join(srcPath, f);
        stat = fs.lstatSync(curPath);
        if (stat.isDirectory() && !isIgnore(f)) {
            const output = await require(curPath).init();
            rKey = f[0].toUpperCase() + f.substr(1)
            if (typeof output === "function") {
                obj[rKey] = await output(app);
                return;
            }
            obj[rKey] = output;
        }
    };
}

const startServer = async function () {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use(cors());
    server.use(express.static('uploads'));
    server.use((req, res, next) => {
        console.log(`Request comming: ${req.url}`)
        next()
    })
    try {
        await requireAll(__dirname, server, App);
        const { Config: rootConfig } = App;
        const PORT = rootConfig.App.PORT || 3000;

        server.listen(PORT, async () => {
            console.log('\x1b[36m%s\x1b[0m', `Server is running on port ${PORT}`);
            const roleAdmin = await UserRole.findAll({ where: { type: 'Admin' } });
            if (roleAdmin.length === 0) {
                console.log("Role Admin isn't exist!");
                await UserRole.create({
                    type: "Admin",
                    create: true,
                    read: true,
                    up: true,
                    del: true
                }).then(async () => {
                    console.log("Role Admin is created!");
                });
            } else {
                console.log("Role Admin is exist!");
            }
            const role = await UserRole.findAll({ where: { type: "Admin" } });
            console.log("ROLE:", JSON.stringify(role, null, 2));
            const user = await User.findAll({ where: { email: 'ly@gmail.com' } });
            if (user.length === 0) {
                console.log("Admin isn't exist!");
                const info = {
                    fullName: "Gia Ly",
                    address: "387A Lê Văn Khương, phường Hiệp Thành, quận 12 TP.HCM",
                    phone: "0373016238",
                    dateOfBirth: new Date("1998/08/04").toLocaleString({ timeZone: "VN" }),
                    email: "ly@gmail.com",
                    password: bcrypt.hashSync("123", salt),
                    country: "VN",
                    description: "Ahihi Nib",
                    displayName: "MRLYKH",
                    roleId: role[0].id,
                    paymentMethod: ["Momo"]
                };
                console.log("INFO:", JSON.stringify(info, null, 2));
                await User.create(info)
                    .then(() => {
                        console.log("Admin is created!");
                    })
                    .catch((e) => {
                        throw e;
                    });
            } else {
                console.log("Admin is exist!");
            }
            const roleCustomer = await UserRole.findAll({ where: { type: 'Customer' } });
            if (roleCustomer.length === 0) {
                console.log("Role Customer isn't exist!");
                await UserRole.create({
                    type: "Customer",
                    create: true,
                    read: true,
                    up: true,
                    del: false
                }).then(() => {
                    console.log("Role Customer is created!");
                });
            } else {
                console.log("Role Customer is exist!");
            }
        });

    } catch (error) {
        console.error(error)
    }
}

startServer(); 