import { verify } from "jsonwebtoken";
import request from "supertest";
import { app } from "../../../app";
import { JWT_SECRET } from "../../../config";

import { matchPartial } from "../../../test/utils/matchPartial";

const userData = {
  id: "1323819321038",
  profileUrl: "ofjsofdijs",
  email: "skfsdkfhsk",
};

it("Should create an user with google id ", async () => {
  const {
    body: { user, token },
  } = await request(app).post("/api/auth/google").send(userData);

  expect(matchPartial(userData, user, { keyCount: 3 })).toEqual(true);
  expect(user.id).toBeDefined();

  expect(verify(token, JWT_SECRET)).toBeDefined();
});

// it("Should throw an error for unauthenticated user", async () => {
//   const res = await request(app).get("/api/auth/register/flow2");

//   expect(res.status).toBe(401);
// });

// it("Should allow authenticated request", async () => {
//   const res = await request(app)
//     .get("/api/auth/register/flow2")
//     .set("Authorization", `Bearer ${JWT.sign({ id: "317917391" })}`);

//   expect(res.status).toBe(200);
// });
