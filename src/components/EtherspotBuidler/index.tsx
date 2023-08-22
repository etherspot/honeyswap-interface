import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Etherspot } from '@etherspot/react-transaction-buidler'
import { useActiveWeb3React } from '../../hooks'
import { OutlineCard } from '../Card'
import { TYPE } from '../../theme'

const CHAIN_ID = 1

const EtherspotBuidlerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
`

const themeOverride = {
  color: {
    background: {
      main: '#000000',
      card: '#232429',
      cardBorder: '#fff',
      tokenBalanceContainer: '#21002e',
      horizontalLine: 'linear-gradient(90deg, #23a9c9, #cd34a2)',
      topMenu: '#fff',
      topMenuWallet: 'rgba(255, 247, 242, 0.24)',
      topMenuButton: '#fff',
      selectInput: '#232429',
      selectInputBorder: '#fff',
      selectInputExpanded: '#232429',
      selectInputScrollbar: '#41434f',
      selectInputScrollbarHover: '#000',
      selectInputScrollbarActive: '#000',
      selectInputImagePlaceholder: '#232429',
      selectInputToggleButton: '#fff',
      textInput: '#232429',
      switchInput: '#fff',
      switchInputActiveTab: '#2ebbac',
      switchInputInactiveTab: '#fff',
      button: '#2ebbac',
      closeButton: '#fff',
      pill: '#fff7f2',
      roundedImageFallback: '#ffe6d9',
      listItemQuickButtonSecondary: '#41434f',
      listItemQuickButtonPrimary: '#2ebbac',
      statusIconSuccess: '#1ba23d',
      statusIconPending: '#ff6b35',
      statusIconFailed: '#ff0000',
      checkboxInputActive: '#ff884d',
      checkboxInputInactive: '#7f7a99',
      dropdownHoverColor: '#000',
      selectInputExpandedHover: '#000',
      toDropdownColor: '#F8EFEA',
      secondary: '#9889e4',
      selectInputRadioOn: '#f7e580',
      selectInputRadioOff: '#F8EFEA',
      walletButton: 'linear-gradient(to bottom, #fd9250, #ff5548)',
      walletChainDropdown: '#fff',
      walletChainButtonActive: '#ffeee6',
      deployButton: '#ff884d',
      blockParagraphBorder: 'linear-gradient(#346ecd, #cd34a2)',
      settingMenuMain: 'linear-gradient(rgb(253, 146, 80), rgb(255, 85, 72))',
      settingsModalBorder: '#d9d9d940',
      settingsModal: '#232429',
      settingsIcon: '#fd9250',
      loadingAnimationBackground: '#fff',
      loadingAnimationForeground: '#232429',
      textInputBorder: '#46464e'
    },
    text: {
      main: '#ffffff',
      topBar: '#fff',
      topMenu: '#191726',
      topMenuWallet: '#fff',
      cardTitle: '#fff',
      card: '#fff',
      cardDisabled: '#ddd',
      innerLabel: '#bebfc4',
      outerLabel: '#bebfc4',
      selectInput: '#000',
      selectInputOption: '#fff',
      selectInputOptionSecondary: '#fff',
      selectInputImagePlaceholder: '#fff',
      textInput: '#fff',
      textInputSecondary: '#6e6b6a',
      switchInputActiveTab: '#fff',
      switchInputInactiveTab: '#000',
      button: '#fff',
      buttonSecondary: '#ffeee6',
      errorMessage: '#ff0000',
      searchInput: '#f7e580',
      searchInputSecondary: '#f7e580',
      pill: '#6e6b6a',
      pillValue: '#191726',
      roundedImageFallback: '#6e6b6a',
      listItemQuickButtonSecondary: '#fff',
      listItemQuickButtonPrimary: '#fff',
      transactionStatusLink: '#f7e580',
      pasteIcon: '#ff884d',
      walletDropdownIcon: '#221f33',
      settingsModalSubHeader: '#6e6b6a',
      settingsMenuItem: '#191726',
      settingsMenuItemHover: '#ee6723'
    }
  }
}

export default function EtherspotBuidler() {
  const { active, account, connector } = useActiveWeb3React()
  const [connectedProvider, setConnectedProvider] = useState<any | null>(null)

  const getConnectedProvider = useCallback(async () => {
    if (!connector) return
    const web3Provider = await connector.getProvider()
    setConnectedProvider(web3Provider)
  }, [connector])

  useEffect(() => {
    if (!connector) return
    getConnectedProvider()
  }, [connector, getConnectedProvider])

  return active && !!account ? (
    <EtherspotBuidlerWrapper>
      <Etherspot
        provider={connectedProvider}
        chainId={CHAIN_ID}
        defaultTransactionBlocks={[{ type: 'HONEY_SWAP_LP' }]}
        themeOverride={themeOverride}
        hideSettingsButton
        hideBuyButton
        hideWalletBlockNavigation
        hideTopNavigation
        hideCloseTransactionBlockButton
        hideAddButton
        removeOuterContainer
        hideTransactionBlockTitle
      />
    </EtherspotBuidlerWrapper>
  ) : (
    <OutlineCard>
      <TYPE.body fontSize="14px" lineHeight="17px" textAlign="center">
        Connect to a wallet to view your Honey swap liquidity pool.
      </TYPE.body>
    </OutlineCard>
  )
}
