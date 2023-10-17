import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Etherspot } from '@etherspot/react-transaction-buidler'
import AppBody from '../../pages/AppBody'
import { AddRemoveTabs } from '../NavigationTabs'
import { AbstractConnector } from '@web3-react/abstract-connector'
const CHAIN_ID = 1

const EtherspotBuidlerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const themeOverride = {
  color: {
    background: {
      main: '#000000',
      card: '#212429',
      cardBorder: '#fff',
      tokenBalanceContainer: '#21002e',
      horizontalLine: 'linear-gradient(90deg, #23a9c9, #cd34a2)',
      topMenu: '#fff',
      topMenuWallet: 'rgba(255, 247, 242, 0.24)',
      topMenuButton: '#fff',
      selectInput: '#212429',
      selectInputBorder: '#fff',
      selectInputExpanded: '#212429',
      selectInputScrollbar: '#41434f',
      selectInputScrollbarHover: '#000',
      selectInputScrollbarActive: '#000',
      selectInputImagePlaceholder: '#212429',
      selectInputToggleButton: '#fff',
      textInput: '#212429',
      switchInput: '#fff',
      switchInputActiveTab: '#40444f',
      switchInputInactiveTab: '#fff',
      button: '#40444f',
      closeButton: '#fff',
      pill: '#fff7f2',
      roundedImageFallback: '#ffe6d9',
      listItemQuickButtonSecondary: '#41434f',
      listItemQuickButtonPrimary: '#ffe270',
      statusIconSuccess: '#1ba23d',
      statusIconPending: '#ff6b35',
      statusIconFailed: '#ff0000',
      checkboxInputActive: '#ff884d',
      checkboxInputInactive: '#7f7a99',
      dropdownHoverColor: '#000',
      selectInputExpandedHover: '#000',
      toDropdownColor: '#F8EFEA',
      secondary: '#9889e4',
      selectInputRadioOn: '#ffe270',
      selectInputRadioOff: '#F8EFEA',
      walletButton: 'linear-gradient(to bottom, #fd9250, #ff5548)',
      walletChainDropdown: '#fff',
      walletChainButtonActive: '#ffeee6',
      deployButton: '#ff884d',
      blockParagraphBorder: 'linear-gradient(#346ecd, #cd34a2)',
      settingMenuMain: 'linear-gradient(rgb(253, 146, 80), rgb(255, 85, 72))',
      settingsModalBorder: '#d9d9d940',
      settingsModal: '#212429',
      settingsIcon: '#fd9250',
      loadingAnimationBackground: '#fff',
      loadingAnimationForeground: '#212429',
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
      selectInput: '#fff',
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
      searchInput: '#ffe270',
      searchInputSecondary: '#ffe270',
      pill: '#6e6b6a',
      pillValue: '#191726',
      roundedImageFallback: '#6e6b6a',
      listItemQuickButtonSecondary: '#fff',
      listItemQuickButtonPrimary: '#000',
      transactionStatusLink: '#ffe270',
      pasteIcon: '#ff884d',
      walletDropdownIcon: '#221f33',
      settingsModalSubHeader: '#6e6b6a',
      settingsMenuItem: '#191726',
      settingsMenuItemHover: '#ee6723'
    }
  }
}

export default function EtherspotBuidler({ connector }: { connector: AbstractConnector }) {
  const [connectedProvider, setConnectedProvider] = useState<any | null>(null)

  useEffect(() => {
    let expired = false;

    const getConnectedProvider = async () => {
      if (!connector) return
      const web3Provider = await connector.getProvider()
      if (!web3Provider || expired) return
      setConnectedProvider(web3Provider)
    }

    getConnectedProvider();

    return () => {
      expired = true
    }
  }, [connector])

  if (!connectedProvider) return null

  return (
    <AppBody>
      <AddRemoveTabs creating={false} adding={true} />
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
          hideWalletSwitch
          removeTransactionBlockContainer
          // hideActionPreviewHeader
        />
      </EtherspotBuidlerWrapper>
    </AppBody>
  )
}
