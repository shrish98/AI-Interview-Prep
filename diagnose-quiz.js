const { GoogleGenerativeAI } = require('@google/generative-ai')
const { PrismaClient } = require('./lib/generated/prisma')
require('dotenv').config()

async function test () {
  console.log('Starting diagnostic test...')

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('GEMINI_API_KEY is missing!')
    return
  }
  console.log('GEMINI_API_KEY found (length:', apiKey.length, ')')

  const modelsToTest = [
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-2.5-flash',
    'gemini-1.5-pro'
  ]
  const genAI = new GoogleGenerativeAI(apiKey)

  for (const modelName of modelsToTest) {
    try {
      console.log(`--- Testing AI model: ${modelName} ---`)
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent("Say 'hello test'")
      console.log(`SUCCESS for ${modelName}:`, result.response.text())
    } catch (error) {
      console.error(`FAILED for ${modelName}:`, error.message)
    }
  }

  const prisma = new PrismaClient()
  try {
    console.log('--- Testing Database connection ---')
    const user = await prisma.user.findFirst({
      where: { ClerkUserId: 'user_3AUbRYN4oU36kneDUIGJSis0YjJ' }
    })
    console.log(
      'Test user fetch result:',
      user ? 'Found: ' + user.name : 'Not found'
    )
  } catch (error) {
    console.error('Database Test failed:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

test()
