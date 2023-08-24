import React from 'react'
import { AutoColumn } from '../../components/Column'
import { useActiveWeb3React } from '../../hooks'
import EtherspotBuidler from '../../components/EtherspotBuidler'
import { OutlineCard } from '../../components/Card'
import { TYPE } from '../../theme'
import { PageWrapper } from '../Pool/styleds'

export default function CrossChain() {
  const { active, account, connector } = useActiveWeb3React()

  return (
    <PageWrapper>
      {active && !!account && connector ? (
        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg">
            <EtherspotBuidler connector={connector} />
          </AutoColumn>
        </AutoColumn>
      ) : (
        <OutlineCard>
          <TYPE.body fontSize="14px" lineHeight="17px" textAlign="center">
            Connect to a wallet to view cross chain block.
          </TYPE.body>
        </OutlineCard>
      )}
    </PageWrapper>
  )
}
