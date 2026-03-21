import { test, expect } from '@playwright/test'

test.describe('Arbitrage Inception Website', () => {
  test('Home page loads with updated content', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    await expect(page).toHaveTitle(/Arbitrage Inception/i)
    
    const tokenomics = page.locator('text=Tokenomics')
    await expect(tokenomics).toBeVisible()
    
    const supply = page.locator('text=1,000,000,000')
    await expect(supply).toBeVisible()
    
    const tax = page.locator('text=4%')
    await expect(tax).toBeVisible()
    
    const roadmap = page.locator('text=Roadmap')
    await expect(roadmap).toBeVisible()
    
    const launchItem = page.locator('text=Launch on RevShare')
    await expect(launchItem).toBeVisible()
  })

  test('Swap page loads with demo mode', async ({ page }) => {
    await page.goto('http://localhost:3000/swap')
    
    await expect(page.locator('text=Arbitrage Inception')).toBeVisible()
    
    await expect(page.locator('text=Demo Mode')).toBeVisible()
    
    await expect(page.locator('text=Connect Wallet')).toBeVisible()
  })

  test('Zap page loads with pool selector', async ({ page }) => {
    await page.goto('http://localhost:3000/zap')
    
    await expect(page.locator('text=Liquidity Zap')).toBeVisible()
    
    const poolSelector = page.locator('select')
    await expect(poolSelector).toBeVisible()
    
    await expect(page.locator('text=Zap In')).toBeVisible()
    await expect(page.locator('text=Zap Out')).toBeVisible()
  })

  test('Pool selector shows all pools including V3', async ({ page }) => {
    await page.goto('http://localhost:3000/zap')
    
    const poolSelector = page.locator('select')
    await poolSelector.click()
    
    const pcsV2Option = page.locator('optgroup[label="PancakeSwap V2"] option').first()
    await expect(pcsV2Option).toBeVisible()
    
    const pcsV3Option = page.locator('optgroup[label="PancakeSwap V3"] option').first()
    await expect(pcsV3Option).toBeVisible()
  })

  test('Zap Out shows correct link format', async ({ page }) => {
    await page.goto('http://localhost:3000/zap')
    
    const zapOutTab = page.locator('text=Zap Out')
    await zapOutTab.click()
    
    const link = page.locator('a[href*="pancakeswap.finance"]')
    await expect(link).toBeVisible()
    
    const href = await link.getAttribute('href')
    expect(href).toMatch(/pancakeswap\.finance\/remove\/.+\/.+|pancakeswap\.finance\/liquidity\/.+/)
  })
})
