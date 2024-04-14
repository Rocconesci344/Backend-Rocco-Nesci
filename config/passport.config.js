const passport = require("passport");
const local = require("passport-local");
const github = require("passport-github2");
const { usuarioModelo } = require("../dao/models/usuarios.model.js");
const { generaHash, validaPassword } = require("../utils.js");

exports.initPassport = () => {
    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, username, password, done) => {
                try {
                    let { nombre } = req.body;
                    if (!nombre) {
                        return done(null, false);
                    }

                    let existe = await usuarioModelo.findOne({ email: username });
                    if (existe) {
                        return done(null, false);
                    }

                    password = generaHash(password);

                    let usuario = await usuarioModelo.create({
                        nombre,
                        password,
                        email: username
                    });
                    if (usuario) {
                        return done(null, usuario);
                    } else {
                        return done(null, false);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done) => {
                try {
                    let usuario = await usuarioModelo.findOne({ email: username });
                    if (!usuario) {
                        return done(null, false);
                    }

                    if (!validaPassword(password, usuario.password)) {
                        return done(null, false);
                    }

                    return done(null, usuario);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID: "Iv1.f0301997906746ae",
                clientSecret: "cd7cdeab13c1ca88cfa661cf8b70aab096f6b16c",
                callbackURL: "http://localhost:8080/api/sessions/callbackGithub"
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    let { name: nombre, email } = profile._json;
                    if (!email) {
                        return done(null, false);
                    }
                    let usuario = await usuarioModelo.findOne({ email });
                    if (!usuario) {
                        usuario = await usuarioModelo.create({
                            nombre,
                            email,
                            profileGithub: profile
                        });
                    }
                    return done(null, usuario);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((usuario, done) => {
        return done(null, usuario);
    });

    passport.deserializeUser((usuario, done) => {
        return done(null, usuario);
    });
};

module.exports = passport;
