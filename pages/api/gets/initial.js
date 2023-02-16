import { customAlphabet } from "nanoid"

const publicKey = "-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAPXyL389fIuEGzEQIPG3uITdnLEZGrpR5FaICHgIt9+iQ/Xv8C70IFClNsZlU+AOTXQI/CgYxVUZ2XbmWIcDU8cCAwEAAQ==-----END PUBLIC KEY-----"

const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 24)

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.statusCode = 200
    res.setHeader('ZPCK', publicKey)
    res.setHeader('ZBGID', nanoid())
    res.setHeader('ContentType', 'application/json;charset=utf-8')
    res.end()
  }
}
