export type ScancodeLineInput = {
  alt: string
  ext: string
  scanCode: string
  vkCode: string
  vkId: string
}

export class ScancodeLine {
  alt: boolean
  ext: boolean
  scanCode: number
  vkCode: number
  vkId: string
  constructor(input: ScancodeLineInput) {
    this.scanCode = Number.parseInt(input.scanCode, 16)
    this.ext = input.ext === `1`
    this.alt = input.alt === `1`
    this.vkCode = Number.parseInt(input.vkCode, 16)
    this.vkId = input.vkId
  }
}
