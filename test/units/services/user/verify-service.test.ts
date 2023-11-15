import verifyEmail from "../../../../src/services/user/verify-email-service"

describe("User Verify Service", () => {
  test("Should return error when params key does not provided", async () => {
    const payload = {

    }

    try {
      await verifyEmail(payload)
    } catch (err: any) {
      expect(err.message).toBe("params key does not provided")
      expect(err.code).toEqual(400)
      expect(err.result).toBe("bad request")
    }
  })
})