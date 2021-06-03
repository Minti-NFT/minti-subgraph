import { Transfer } from '../entities/SingleAsset/SingleAsset'
import { TransferSingle, TransferBatch } from '../entities/MultiAsset/MultiAsset'
import { NFT } from '../entities/schema'
import { getNFTId, getTokenURI } from '../models/nft'
import { createAccount } from '../models/wallet'

export function handleTransfer(event: Transfer): void {
  if (event.params.tokenId.toString() == '') {
    return
  }

  let id = getNFTId(event.address.toHexString(), event.params.tokenId.toString(), true)
  let nft = new NFT(id)

  nft.tokenId = event.params.tokenId
  nft.tokenURI = getTokenURI(event.address, event.params.tokenId)
  nft.mode = true
  nft.account = event.params.to.toString()
  createAccount(event.params.to)

  nft.save()
}

export function handleTransferSingle(event: TransferSingle): void {
  if (event.params.id.toString() == '') {
    return
  }

  let id = getNFTId(event.address.toHexString(), event.params.id.toString(), false)
  let nft = new NFT(id)

  nft.tokenId = event.params.id
  nft.tokenURI = getTokenURI(event.address, event.params.id)
  nft.mode = false
  nft.account = event.params.to.toString()
  createAccount(event.params.to)

  nft.save()
}

export function handleTransferBatch(event: TransferBatch): void {
  event.params.ids.forEach(tokenId => {
    if (tokenId.toString() == "") return

    let id = getNFTId(event.address.toHexString(), tokenId.toString(), true)
    let nft = new NFT(id)
  
    nft.tokenId = tokenId
    nft.tokenURI = getTokenURI(event.address, tokenId)
    nft.mode = false
    nft.account = event.params.to.toString()
    createAccount(event.params.to)
  
    nft.save()
  })
}
