import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { userRepository } from "../orm/datasource";

export const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const jwtVerify = async (payload, done) => {
  try {
    const user = await userRepository.findOneBy({ id: payload.sub });

    if (! user) return done(null, false);

    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);