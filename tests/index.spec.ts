import imageProcessor from "../src/utilities/imageProcessor"
import path from "path"
import fs from "fs"
import supertest from "supertest"
import app from "../src/index"

const request = supertest(app)

process.env.IMAGE_DIR = path.resolve(__dirname, "../images/")

describe("image processor", () => {
  const filename = "santamonica_test.jpg"
  const thumbnail = path.join(process.env.IMAGE_DIR as string, "thumbnails", filename)

  beforeAll(() => {
    try {
      fs.unlinkSync(thumbnail)
      console.log("thumbnail deleted")
    } catch (e) {
      console.log(e)
    }
  })

  it("should create the thumbnail when it does not exist", async () => {
    expect(fs.existsSync(thumbnail)).toBe(false)

    await imageProcessor(thumbnail, filename, "100", "100")

    expect(fs.existsSync(thumbnail)).toBe(true)
  })

  it("should return the thumbnail when it does exist", async () => {
    expect(fs.existsSync(thumbnail)).toBe(true)

    const thumb = await imageProcessor(thumbnail, filename, "100", "100")

    expect(thumb).toBe(thumbnail)
  })
})

describe("endpoint", () => {
  it("gets the api endpoint", (done) => {
    request.get("/api/images").then((response) => {
      expect(response.status).toBe(200)
      done()
    })
  })
})
