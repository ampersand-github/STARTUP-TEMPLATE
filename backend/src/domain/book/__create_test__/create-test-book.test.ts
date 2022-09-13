/*
import { createTestUser } from "./create-test-user";
import { UserId } from "./user-id";
import { User } from "./user";

describe("createTestUser", () => {
  it("デフォルト値の場合", () => {
    const user = createTestUser();
    expect(user).toEqual(expect.any(User));
  });

  it("すべての値を設定する場合", () => {
    const userId = UserId.reBuild("dummy-uuid");
    const userName = "山田次郎";
    const tel = "12345678901";
    const user = createTestUser(userId, userName, tel);
    console.log(JSON.stringify(user));
    expect(user.getName()).toStrictEqual(userName);
    expect(user.getTel()).toStrictEqual(tel);
    expect(user.id).toStrictEqual(userId);
  });

  it("一部の値を設定する場合", () => {
    const userName = "山田次郎";
    const userId = UserId.reBuild("dummy-uuid");
    const user = createTestUser(undefined, userName, undefined);
    expect(user.getName()).toStrictEqual(userName);
    expect(user.id).not.toStrictEqual(userId);
  });
});

 */
