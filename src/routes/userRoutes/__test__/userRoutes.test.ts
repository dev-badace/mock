import request from "supertest";
import { app } from "../../../app";
import { User, UserAttrs } from "../../../models/User";

const createUser = async (userAttrs: UserAttrs) => {
  const user = User.build(userAttrs);
  return await user.save();
};

const userData = {
  googleId: "1323819321038",
  profileUrl: "ofjsofdijs",
  email: "skfsdkfhsk",
};

it("Should throw an error when getting profile without JWT", async () => {
  const res = await request(app).get("/me");

  console.log(res.body);

  expect(res.status).toBe(401);
  expect(res.body.errors[0].message).toBe("Not Authorized");
});

it("Should give profile info", async () => {
  const user1 = await createUser(userData);

  const res = await request(app).get("/me");

  console.log(res.body);

  expect(res.status).toBe(401);
  expect(res.body.errors[0].message).toBe("Not Authorized");
});
