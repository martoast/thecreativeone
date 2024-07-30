// server/api/underwrite.js
import { defineEventHandler } from 'h3'

const getPropertyDetails = async (propertyId) => {
  // This would be replaced with an actual API call
  return {
    estimatedValue: 500000,
    lastSalePrice: "450000",
    lastSaleDate: "2020-01-15",
    propertyType: "SFR",
    propertyInfo: {
      bedrooms: 3,
      bathrooms: 2,
      buildingSquareFeet: 2000,
      yearBuilt: 1990
    },
    estimatedEquity: 200000,
    currentMortgages: [
      {
        amount: 300000,
        interestRate: 3.5
      }
    ]
  }
}

const calculateLTV = (loanAmount, estimatedValue) => {
  return (loanAmount / estimatedValue) * 100
}

const calculatePriceAppreciation = (currentValue, lastSalePrice, lastSaleDate) => {
  const yearsSinceSale = (new Date() - new Date(lastSaleDate)) / (365 * 24 * 60 * 60 * 1000)
  if (yearsSinceSale === 0) return 0
  const annualAppreciation = ((currentValue / parseFloat(lastSalePrice)) ** (1/yearsSinceSale)) - 1
  return annualAppreciation * 100
}

const assessRisk = (propertyData, loanAmount) => {
  const ltv = calculateLTV(loanAmount, propertyData.estimatedValue)
  const priceAppreciation = calculatePriceAppreciation(
    propertyData.estimatedValue,
    propertyData.lastSalePrice,
    propertyData.lastSaleDate
  )
  const propertyAge = new Date().getFullYear() - propertyData.propertyInfo.yearBuilt
  
  let riskScore = 0
  if (ltv > 80) riskScore += 30
  else if (ltv > 70) riskScore += 15
  
  if (priceAppreciation > 10) riskScore -= 10
  else if (priceAppreciation < 0) riskScore += 20
  
  if (propertyAge > 50) riskScore += 10
  else if (propertyAge > 30) riskScore += 5
  
  return riskScore
}

const getLoanRecommendation = (riskScore, ltv) => {
  if (riskScore < 20 && ltv <= 80) return ["Approve", 3.5]
  else if (riskScore < 40 && ltv <= 90) return ["Approve", 4.5]
  else return ["Deny", null]
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { propertyId, loanAmount } = body

  const propertyData = await getPropertyDetails(propertyId)
  const ltv = calculateLTV(loanAmount, propertyData.estimatedValue)
  const riskScore = assessRisk(propertyData, loanAmount)
  const [recommendation, rate] = getLoanRecommendation(riskScore, ltv)
  
  const maxLoan = propertyData.estimatedValue * 0.8 // 80% LTV as maximum
  
  return {
    propertyValue: propertyData.estimatedValue,
    loanAmount: loanAmount,
    ltv: ltv,
    riskScore: riskScore,
    recommendation: recommendation,
    maxLoanAmount: maxLoan,
    interestRate: rate
  }
})