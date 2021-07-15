import imageProcessor from "../src/utilities/imageProcessor"
import path from "path"
import fs from "fs"
import supertest from "supertest"
import app from "../src/index"

const request = supertest(app)

process.env.IMAGE_DIR = path.resolve(__dirname, "../images/")

const filename = "santamonica_test.jpg"
const width = "100"
const height = "100"
const filenameWidthDimension = filename.split(".")[0] + `_${width}x${height}.jpg`
const thumbnail = path.join(process.env.IMAGE_DIR as string, "thumbnails", filename)
const thumbnailWithDimension = path.join(process.env.IMAGE_DIR as string, "thumbnails", filenameWidthDimension)

describe("image processor", () => {
  beforeAll(() => {
    try {
      fs.unlinkSync(thumbnailWithDimension)
      console.log("thumbnail deleted")
      // eslint-disable-next-line no-empty
    } catch (e) {}
  })

  it("should create the thumbnail when it does not exist", async () => {
    expect(fs.existsSync(thumbnailWithDimension)).toBe(false)

    await imageProcessor(thumbnail, filename, width, height)

    expect(fs.existsSync(thumbnailWithDimension)).toBe(true)
  })

  it("should return the thumbnail when it does exist", async () => {
    expect(fs.existsSync(thumbnailWithDimension)).toBe(true)

    const thumb = await imageProcessor(thumbnail, filename, width, height)

    expect(thumb).toBe(thumbnailWithDimension)
  })
})

describe("endpoint", () => {
  beforeAll(() => {
    try {
      fs.unlinkSync(thumbnailWithDimension)
      console.log("thumbnail deleted")
      // eslint-disable-next-line no-empty
    } catch (e) {}
  })

  it("gets the api endpoint", (done) => {
    request.get(`/api/images?filename=${filename}&width=${width}&height=${height}`).then((response) => {
      expect(response.status).toBe(200)
      expect(fs.existsSync(thumbnailWithDimension)).toBe(true)
      done()
    })
  })
})
