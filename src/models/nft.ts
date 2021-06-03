import { Address, BigInt, log } from '@graphprotocol/graph-ts'
import { SingleAsset, Transfer } from '../entities/SingleAsset/SingleAsset'

export function isMint(event: Transfer): boolean {
  return event.params.from.toHexString() == '0x0000000000000000000000000000000000000000'
}

export function getNFTId(contractAddress: string, tokenId: string, mode: boolean): string {
  return `${mode ? 'Single' : 'Multi'}-${contractAddress}-${tokenId}`
}

export function getTokenURI(address: Address, tokenId: BigInt): string {
  let asset = SingleAsset.bind(address)
  let tokenURICallResult = asset.try_tokenURI(tokenId)

  let tokenURI = ''

  if (tokenURICallResult.reverted) {
    log.warning('tokenURI reverted for tokenID: {} contract: {}', [
      tokenId.toString(), address.toHexString()
    ])
  } else {
    tokenURI = tokenURICallResult.value
  }

  return tokenURI
}
