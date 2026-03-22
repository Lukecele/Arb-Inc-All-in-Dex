"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3722],{63722:(e,t,i)=>{i.r(t),i.d(t,{AppKitModal:()=>io,W3mListWallet:()=>ip,W3mModal:()=>ir,W3mModalBase:()=>ia,W3mRouterContainer:()=>iw,W3mUsageExceededView:()=>ic});var a=i(83138),r=i(94738),o=i(78964),n=i(67074),s=i(76595),c=i(61329),l=i(33280),u=i(72880),d=i(67869),p=i(27798),h=i(67243);let m={isUnsupportedChainView:()=>"UnsupportedChain"===d.I.state.view||"SwitchNetwork"===d.I.state.view&&d.I.state.history.includes("UnsupportedChain"),async safeClose(){if(this.isUnsupportedChainView()||await h.U.isSIWXCloseDisabled())return void s.W.shake();("DataCapture"===d.I.state.view||"DataCaptureOtpConfirm"===d.I.state.view)&&p.x.disconnect(),s.W.close()}};var w=i(45069),g=i(65374),y=i(12661),f=i(98866),b=i(31470),v=i(45553),k=i(73537),x=i(30982),T=i(71305),A=i(22378),S=i(12319),I=i(83941);let E={getGasPriceInEther:(e,t)=>Number(t*e)/1e18,getGasPriceInUSD(e,t,i){let a=E.getGasPriceInEther(t,i);return b.S.bigNumber(e).times(a).toNumber()},getPriceImpact({sourceTokenAmount:e,sourceTokenPriceInUSD:t,toTokenPriceInUSD:i,toTokenAmount:a}){let r=b.S.bigNumber(e).times(t),o=b.S.bigNumber(a).times(i);return r.minus(o).div(r).times(100).toNumber()},getMaxSlippage(e,t){let i=b.S.bigNumber(e).div(100);return b.S.multiply(t,i).toNumber()},getProviderFee:(e,t=.0085)=>b.S.bigNumber(e).times(t).toString(),isInsufficientNetworkTokenForGas:(e,t)=>!!b.S.bigNumber(e).eq(0)||b.S.bigNumber(b.S.bigNumber(t||"0")).gt(e),isInsufficientSourceTokenForSwap(e,t,i){let a=i?.find(e=>e.address===t)?.quantity?.numeric;return b.S.bigNumber(a||"0").lt(e)}};var P=i(36964),C=i(52502),$=i(44826),N=i(70417);let R={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:A.oU.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},O=(0,y.BX)({...R}),q={state:O,subscribe:e=>(0,y.B1)(O,()=>e(O)),subscribeKey:(e,t)=>(0,f.u$)(O,e,t),getParams(){let e=c.W.state.activeChain,t=c.W.getAccountData(e)?.caipAddress??c.W.state.activeCaipAddress,i=S.w.getPlainAddress(t),a=(0,T.K1)(),r=l.a.getConnectorId(c.W.state.activeChain);if(!i)throw Error("No address found to swap the tokens from.");let o=!O.toToken?.address||!O.toToken?.decimals,n=!O.sourceToken?.address||!O.sourceToken?.decimals||!b.S.bigNumber(O.sourceTokenAmount).gt(0),s=!O.sourceTokenAmount;return{networkAddress:a,fromAddress:i,fromCaipAddress:t,sourceTokenAddress:O.sourceToken?.address,toTokenAddress:O.toToken?.address,toTokenAmount:O.toTokenAmount,toTokenDecimals:O.toToken?.decimals,sourceTokenAmount:O.sourceTokenAmount,sourceTokenDecimals:O.sourceToken?.decimals,invalidToToken:o,invalidSourceToken:n,invalidSourceTokenAmount:s,availableToSwap:t&&!o&&!n&&!s,isAuthConnector:r===v.o.CONNECTOR_ID.AUTH}},async setSourceToken(e){if(!e){O.sourceToken=e,O.sourceTokenAmount="",O.sourceTokenPriceInUSD=0;return}O.sourceToken=e,await W.setTokenPrice(e.address,"sourceToken")},setSourceTokenAmount(e){O.sourceTokenAmount=e},async setToToken(e){if(!e){O.toToken=e,O.toTokenAmount="",O.toTokenPriceInUSD=0;return}O.toToken=e,await W.setTokenPrice(e.address,"toToken")},setToTokenAmount(e){O.toTokenAmount=e?b.S.toFixed(e,6):""},async setTokenPrice(e,t){let i=O.tokensPriceMap[e]||0;i||(O.loadingPrices=!0,i=await W.getAddressPrice(e)),"sourceToken"===t?O.sourceTokenPriceInUSD=i:"toToken"===t&&(O.toTokenPriceInUSD=i),O.loadingPrices&&(O.loadingPrices=!1),W.getParams().availableToSwap&&!O.switchingTokens&&W.swapTokens()},async switchTokens(){if(!O.initializing&&O.initialized&&!O.switchingTokens){O.switchingTokens=!0;try{let e=O.toToken?{...O.toToken}:void 0,t=O.sourceToken?{...O.sourceToken}:void 0,i=e&&""===O.toTokenAmount?"1":O.toTokenAmount;W.setSourceTokenAmount(i),W.setToTokenAmount(""),await W.setSourceToken(e),await W.setToToken(t),O.switchingTokens=!1,W.swapTokens()}catch(e){throw O.switchingTokens=!1,e}}},resetState(){O.myTokensWithBalance=R.myTokensWithBalance,O.tokensPriceMap=R.tokensPriceMap,O.initialized=R.initialized,O.initializing=R.initializing,O.switchingTokens=R.switchingTokens,O.sourceToken=R.sourceToken,O.sourceTokenAmount=R.sourceTokenAmount,O.sourceTokenPriceInUSD=R.sourceTokenPriceInUSD,O.toToken=R.toToken,O.toTokenAmount=R.toTokenAmount,O.toTokenPriceInUSD=R.toTokenPriceInUSD,O.networkPrice=R.networkPrice,O.networkTokenSymbol=R.networkTokenSymbol,O.networkBalanceInUSD=R.networkBalanceInUSD,O.inputError=R.inputError},resetValues(){let{networkAddress:e}=W.getParams(),t=O.tokens?.find(t=>t.address===e);W.setSourceToken(t),W.setToToken(void 0)},getApprovalLoadingState:()=>O.loadingApprovalTransaction,clearError(){O.transactionError=void 0},async initializeState(){if(!O.initializing){if(O.initializing=!0,!O.initialized)try{await W.fetchTokens(),O.initialized=!0}catch(e){O.initialized=!1,g.P.showError("Failed to initialize swap"),d.I.goBack()}O.initializing=!1}},async fetchTokens(){let{networkAddress:e}=W.getParams();await W.getNetworkTokenPrice(),await W.getMyTokensWithBalance();let t=O.myTokensWithBalance?.find(t=>t.address===e);t&&(O.networkTokenSymbol=t.symbol,W.setSourceToken(t),W.setSourceTokenAmount("0"))},async getTokenList(){let e=c.W.state.activeCaipNetwork?.caipNetworkId;if(O.caipNetworkId!==e||!O.tokens)try{O.tokensLoading=!0;let t=await I.s.getTokenList(e);O.tokens=t,O.caipNetworkId=e,O.popularTokens=t.sort((e,t)=>e.symbol<t.symbol?-1:+(e.symbol>t.symbol));let i=(e&&A.oU.SUGGESTED_TOKENS_BY_CHAIN?.[e]||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e),a=(A.oU.SWAP_SUGGESTED_TOKENS||[]).map(e=>t.find(t=>t.symbol===e)).filter(e=>!!e).filter(e=>!i.some(t=>t.address===e.address));O.suggestedTokens=[...i,...a]}catch(e){O.tokens=[],O.popularTokens=[],O.suggestedTokens=[]}finally{O.tokensLoading=!1}},async getAddressPrice(e){let t=O.tokensPriceMap[e];if(t)return t;let i=await $.T.fetchTokenPrice({addresses:[e]}),a=i?.fungibles||[],r=[...O.tokens||[],...O.myTokensWithBalance||[]],o=r?.find(t=>t.address===e)?.symbol,n=parseFloat((a.find(e=>e.symbol.toLowerCase()===o?.toLowerCase())?.price||0).toString());return O.tokensPriceMap[e]=n,n},async getNetworkTokenPrice(){let{networkAddress:e}=W.getParams(),t=await $.T.fetchTokenPrice({addresses:[e]}).catch(()=>(g.P.showError("Failed to fetch network token price"),{fungibles:[]})),i=t.fungibles?.[0],a=i?.price.toString()||"0";O.tokensPriceMap[e]=parseFloat(a),O.networkTokenSymbol=i?.symbol||"",O.networkPrice=a},async getMyTokensWithBalance(e){let t=await x.Z.getMyTokensWithBalance({forceUpdate:e,caipNetwork:c.W.state.activeCaipNetwork,address:c.W.getAccountData()?.address}),i=I.s.mapBalancesToSwapTokens(t);i&&(await W.getInitialGasPrice(),W.setBalances(i))},setBalances(e){let{networkAddress:t}=W.getParams(),i=c.W.state.activeCaipNetwork;if(!i)return;let a=e.find(e=>e.address===t);e.forEach(e=>{O.tokensPriceMap[e.address]=e.price||0}),O.myTokensWithBalance=e.filter(e=>e.address.startsWith(i.caipNetworkId)),O.networkBalanceInUSD=a?b.S.multiply(a.quantity.numeric,a.price).toString():"0"},async getInitialGasPrice(){let e=await I.s.fetchGasPrice();if(!e)return{gasPrice:null,gasPriceInUSD:null};switch(c.W.state?.activeCaipNetwork?.chainNamespace){case v.o.CHAIN.SOLANA:return O.gasFee=e.standard??"0",O.gasPriceInUSD=b.S.multiply(e.standard,O.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(O.gasFee),gasPriceInUSD:Number(O.gasPriceInUSD)};case v.o.CHAIN.EVM:default:let t=e.standard??"0",i=BigInt(t),a=BigInt(15e4),r=E.getGasPriceInUSD(O.networkPrice,a,i);return O.gasFee=t,O.gasPriceInUSD=r,{gasPrice:i,gasPriceInUSD:r}}},async swapTokens(){let e=c.W.getAccountData()?.address,t=O.sourceToken,i=O.toToken,a=b.S.bigNumber(O.sourceTokenAmount).gt(0);if(a||W.setToTokenAmount(""),!i||!t||O.loadingPrices||!a||!e)return;O.loadingQuote=!0;let r=b.S.bigNumber(O.sourceTokenAmount).times(10**t.decimals).round(0).toFixed(0);try{let a=await $.T.fetchSwapQuote({userAddress:e,from:t.address,to:i.address,gasPrice:O.gasFee,amount:r.toString()});O.loadingQuote=!1;let o=a?.quotes?.[0]?.toAmount;if(!o)return void C.h.open({displayMessage:"Incorrect amount",debugMessage:"Please enter a valid amount"},"error");let n=b.S.bigNumber(o).div(10**i.decimals).toString();W.setToTokenAmount(n),W.hasInsufficientToken(O.sourceTokenAmount,t.address)?O.inputError="Insufficient balance":(O.inputError=void 0,W.setTransactionDetails())}catch(t){let e=await I.s.handleSwapError(t);O.loadingQuote=!1,O.inputError=e||"Insufficient balance"}},async getTransaction(){let{fromCaipAddress:e,availableToSwap:t}=W.getParams(),i=O.sourceToken,a=O.toToken;if(e&&t&&i&&a&&!O.loadingQuote)try{let t;return O.loadingBuildTransaction=!0,t=await I.s.fetchSwapAllowance({userAddress:e,tokenAddress:i.address,sourceTokenAmount:O.sourceTokenAmount,sourceTokenDecimals:i.decimals})?await W.createSwapTransaction():await W.createAllowanceTransaction(),O.loadingBuildTransaction=!1,O.fetchError=!1,t}catch(e){d.I.goBack(),g.P.showError("Failed to check allowance"),O.loadingBuildTransaction=!1,O.approvalTransaction=void 0,O.swapTransaction=void 0,O.fetchError=!0;return}},async createAllowanceTransaction(){let{fromCaipAddress:e,sourceTokenAddress:t,toTokenAddress:i}=W.getParams();if(e&&i){if(!t)throw Error("createAllowanceTransaction - No source token address found.");try{let a=await $.T.generateApproveCalldata({from:t,to:i,userAddress:e}),r=S.w.getPlainAddress(a.tx.from);if(!r)throw Error("SwapController:createAllowanceTransaction - address is required");let o={data:a.tx.data,to:r,gasPrice:BigInt(a.tx.eip155.gasPrice),value:BigInt(a.tx.value),toAmount:O.toTokenAmount};return O.swapTransaction=void 0,O.approvalTransaction={data:o.data,to:o.to,gasPrice:o.gasPrice,value:o.value,toAmount:o.toAmount},{data:o.data,to:o.to,gasPrice:o.gasPrice,value:o.value,toAmount:o.toAmount}}catch(e){d.I.goBack(),g.P.showError("Failed to create approval transaction"),O.approvalTransaction=void 0,O.swapTransaction=void 0,O.fetchError=!0;return}}},async createSwapTransaction(){let{networkAddress:e,fromCaipAddress:t,sourceTokenAmount:i}=W.getParams(),a=O.sourceToken,r=O.toToken;if(!t||!i||!a||!r)return;let o=p.x.parseUnits(i,a.decimals)?.toString();try{let i=await $.T.generateSwapCalldata({userAddress:t,from:a.address,to:r.address,amount:o,disableEstimate:!0}),n=a.address===e,s=BigInt(i.tx.eip155.gas),c=BigInt(i.tx.eip155.gasPrice),l=S.w.getPlainAddress(i.tx.to);if(!l)throw Error("SwapController:createSwapTransaction - address is required");let u={data:i.tx.data,to:l,gas:s,gasPrice:c,value:n?BigInt(o??"0"):BigInt("0"),toAmount:O.toTokenAmount};return O.gasPriceInUSD=E.getGasPriceInUSD(O.networkPrice,s,c),O.approvalTransaction=void 0,O.swapTransaction=u,u}catch(e){d.I.goBack(),g.P.showError("Failed to create transaction"),O.approvalTransaction=void 0,O.swapTransaction=void 0,O.fetchError=!0;return}},onEmbeddedWalletApprovalSuccess(){g.P.showLoading("Approve limit increase in your wallet"),d.I.replace("SwapPreview")},async sendTransactionForApproval(e){let{fromAddress:t,isAuthConnector:i}=W.getParams();O.loadingApprovalTransaction=!0,i?d.I.pushTransactionStack({onSuccess:W.onEmbeddedWalletApprovalSuccess}):g.P.showLoading("Approve limit increase in your wallet");try{await p.x.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:v.o.CHAIN.EVM}),await W.swapTokens(),await W.getTransaction(),O.approvalTransaction=void 0,O.loadingApprovalTransaction=!1}catch(e){O.transactionError=e?.displayMessage,O.loadingApprovalTransaction=!1,g.P.showError(e?.displayMessage||"Transaction error"),N.E.sendEvent({type:"track",event:"SWAP_APPROVAL_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:c.W.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:W.state.sourceToken?.symbol||"",swapToToken:W.state.toToken?.symbol||"",swapFromAmount:W.state.sourceTokenAmount||"",swapToAmount:W.state.toTokenAmount||"",isSmartAccount:(0,T.lj)(v.o.CHAIN.EVM)===k.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(e){if(!e)return;let{fromAddress:t,toTokenAmount:i,isAuthConnector:a}=W.getParams();O.loadingTransaction=!0;let r=`Swapping ${O.sourceToken?.symbol} to ${b.S.formatNumberToLocalString(i,3)} ${O.toToken?.symbol}`,o=`Swapped ${O.sourceToken?.symbol} to ${b.S.formatNumberToLocalString(i,3)} ${O.toToken?.symbol}`;a?d.I.pushTransactionStack({onSuccess(){d.I.replace("Account"),g.P.showLoading(r),q.resetState()}}):g.P.showLoading("Confirm transaction in your wallet");try{let i=[O.sourceToken?.address,O.toToken?.address].join(","),r=await p.x.sendTransaction({address:t,to:e.to,data:e.data,value:e.value,chainNamespace:v.o.CHAIN.EVM});return O.loadingTransaction=!1,g.P.showSuccess(o),N.E.sendEvent({type:"track",event:"SWAP_SUCCESS",properties:{network:c.W.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:W.state.sourceToken?.symbol||"",swapToToken:W.state.toToken?.symbol||"",swapFromAmount:W.state.sourceTokenAmount||"",swapToAmount:W.state.toTokenAmount||"",isSmartAccount:(0,T.lj)(v.o.CHAIN.EVM)===k.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),q.resetState(),a||d.I.replace("Account"),q.getMyTokensWithBalance(i),r}catch(e){O.transactionError=e?.displayMessage,O.loadingTransaction=!1,g.P.showError(e?.displayMessage||"Transaction error"),N.E.sendEvent({type:"track",event:"SWAP_ERROR",properties:{message:e?.displayMessage||e?.message||"Unknown",network:c.W.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:W.state.sourceToken?.symbol||"",swapToToken:W.state.toToken?.symbol||"",swapFromAmount:W.state.sourceTokenAmount||"",swapToAmount:W.state.toTokenAmount||"",isSmartAccount:(0,T.lj)(v.o.CHAIN.EVM)===k.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}});return}},hasInsufficientToken:(e,t)=>E.isInsufficientSourceTokenForSwap(e,t,O.myTokensWithBalance),setTransactionDetails(){let{toTokenAddress:e,toTokenDecimals:t}=W.getParams();e&&t&&(O.gasPriceInUSD=E.getGasPriceInUSD(O.networkPrice,BigInt(O.gasFee),BigInt(15e4)),O.priceImpact=E.getPriceImpact({sourceTokenAmount:O.sourceTokenAmount,sourceTokenPriceInUSD:O.sourceTokenPriceInUSD,toTokenPriceInUSD:O.toTokenPriceInUSD,toTokenAmount:O.toTokenAmount}),O.maxSlippage=E.getMaxSlippage(O.slippage,O.toTokenAmount),O.providerFee=E.getProviderFee(O.sourceTokenAmount))}},W=(0,P.X)(q);var _=i(94545),U=i(71084),D=i(47327),M=i(20296);let L=(0,M.AH)`
  :host {
    display: block;
    border-radius: clamp(0px, ${({borderRadius:e})=>e["8"]}, 44px);
    box-shadow: 0 0 0 1px ${({tokens:e})=>e.theme.foregroundPrimary};
    overflow: hidden;
  }
`,F=class extends a.WF{render(){return(0,a.qy)`<slot></slot>`}};F.styles=[U.W5,L],F=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}([(0,D.E)("wui-card")],F),i(40575),i(71699),i(24772),i(38534);let z=(0,M.AH)`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:e})=>e[2]};
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[6]};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    box-sizing: border-box;
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    color: ${({tokens:e})=>e.theme.textPrimary};
  }

  :host > wui-flex[data-type='info'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};

      wui-icon {
        color: ${({tokens:e})=>e.theme.iconDefault};
      }
    }
  }
  :host > wui-flex[data-type='success'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderSuccess};
      }
    }
  }
  :host > wui-flex[data-type='warning'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundWarning};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderWarning};
      }
    }
  }
  :host > wui-flex[data-type='error'] {
    .icon-box {
      background-color: ${({tokens:e})=>e.core.backgroundError};

      wui-icon {
        color: ${({tokens:e})=>e.core.borderError};
      }
    }
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e["2"]};
    background-color: var(--local-icon-bg-value);
  }
`;var B=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let j={info:"info",success:"checkmark",warning:"warningCircle",error:"warning"},H=class extends a.WF{constructor(){super(...arguments),this.message="",this.type="info"}render(){return(0,a.qy)`
      <wui-flex
        data-type=${(0,o.J)(this.type)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <wui-flex columnGap="2" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color="inherit" size="md" name=${j[this.type]}></wui-icon>
          </wui-flex>
          <wui-text variant="md-medium" color="inherit" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="inherit"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){C.h.close()}};H.styles=[U.W5,z],B([(0,r.MZ)()],H.prototype,"message",void 0),B([(0,r.MZ)()],H.prototype,"type",void 0),H=B([(0,D.E)("wui-alertbar")],H);let V=(0,_.AH)`
  :host {
    display: block;
    position: absolute;
    top: ${({spacing:e})=>e["3"]};
    left: ${({spacing:e})=>e["4"]};
    right: ${({spacing:e})=>e["4"]};
    opacity: 0;
    pointer-events: none;
  }
`;var G=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let Z={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"warning"}},Y=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.open=C.h.state.open,this.onOpen(!0),this.unsubscribe.push(C.h.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t}=C.h.state,i=Z[t];return(0,a.qy)`
      <wui-alertbar
        message=${e}
        backgroundColor=${i?.backgroundColor}
        iconColor=${i?.iconColor}
        icon=${i?.icon}
        type=${t}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};Y.styles=V,G([(0,r.wk)()],Y.prototype,"open",void 0),Y=G([(0,_.EM)("w3m-alertbar")],Y);var K=i(14744),Q=i(29936);let J=(0,M.AH)`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:e})=>e.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var X=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ee=class extends a.WF{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return(0,a.qy)`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${(0,o.J)(this.iconSize)}></wui-icon>
    </button>`}};ee.styles=[U.W5,U.fD,J],X([(0,r.MZ)()],ee.prototype,"icon",void 0),X([(0,r.MZ)()],ee.prototype,"variant",void 0),X([(0,r.MZ)()],ee.prototype,"type",void 0),X([(0,r.MZ)()],ee.prototype,"size",void 0),X([(0,r.MZ)()],ee.prototype,"iconSize",void 0),X([(0,r.MZ)({type:Boolean})],ee.prototype,"fullWidth",void 0),X([(0,r.MZ)({type:Boolean})],ee.prototype,"disabled",void 0),ee=X([(0,D.E)("wui-icon-button")],ee),i(45166);let et=(0,M.AH)`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:e})=>e[1]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
    border-radius: ${({borderRadius:e})=>e[32]};
  }

  wui-image {
    border-radius: 100%;
  }

  wui-text {
    padding-left: ${({spacing:e})=>e[1]};
  }

  .left-icon-container,
  .right-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-type='filled-dropdown'] {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  button[data-type='text-dropdown'] {
    background-color: transparent;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;var ei=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ea={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},er={lg:"lg",md:"md",sm:"sm"},eo=class extends a.WF{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size="lg",this.type="text-dropdown",this.disabled=!1}render(){return(0,a.qy)`<button ?disabled=${this.disabled} data-size=${this.size} data-type=${this.type}>
      ${this.imageTemplate()} ${this.textTemplate()}
      <wui-flex class="right-icon-container">
        <wui-icon name="chevronBottom"></wui-icon>
      </wui-flex>
    </button>`}textTemplate(){let e=ea[this.size];return this.text?(0,a.qy)`<wui-text color="primary" variant=${e}>${this.text}</wui-text>`:null}imageTemplate(){if(this.imageSrc)return(0,a.qy)`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;let e=er[this.size];return(0,a.qy)` <wui-flex class="left-icon-container">
      <wui-icon size=${e} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}};eo.styles=[U.W5,U.fD,et],ei([(0,r.MZ)()],eo.prototype,"imageSrc",void 0),ei([(0,r.MZ)()],eo.prototype,"text",void 0),ei([(0,r.MZ)()],eo.prototype,"size",void 0),ei([(0,r.MZ)()],eo.prototype,"type",void 0),ei([(0,r.MZ)({type:Boolean})],eo.prototype,"disabled",void 0),eo=ei([(0,D.E)("wui-select")],eo),i(50505),i(41163);var en=i(95704);let es={ACCOUNT_TABS:[{label:"Tokens"},{label:"Activity"}],SECURE_SITE_ORIGIN:(void 0!==en&&void 0!==en.env?en.env.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||"https://secure.walletconnect.org",VIEW_DIRECTION:{Next:"next",Prev:"prev"},ANIMATION_DURATIONS:{HeaderText:120,ModalHeight:150,ViewTransition:150},VIEWS_WITH_LEGAL_FOOTER:["Connect","ConnectWallets","OnRampTokenSelect","OnRampFiatSelect","OnRampProviders"],VIEWS_WITH_DEFAULT_FOOTER:["Networks"]};i(41028),i(77237);let ec=(0,M.AH)`
  button {
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  button[data-variant='accent']:hover:enabled,
  button[data-variant='accent']:focus-visible {
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
  }

  button[data-variant='primary']:hover:enabled,
  button[data-variant='primary']:focus-visible,
  button[data-variant='secondary']:hover:enabled,
  button[data-variant='secondary']:focus-visible {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  button[data-size='xs'] > wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='xs'],
  button[data-size='sm'] {
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'],
  button[data-size='lg'] {
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='md'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  button:disabled {
    background-color: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }

  button:hover:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
  }

  button:focus-visible:not(:disabled) {
    background-color: var(--wui-color-accent-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
`;var el=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let eu=class extends a.WF{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="default",this.variant="accent"}render(){return(0,a.qy)`
      <button data-variant=${this.variant} ?disabled=${this.disabled} data-size=${this.size}>
        <wui-icon
          color=${({accent:"accent-primary",primary:"inverse",secondary:"default"})[this.variant]||this.iconColor}
          size=${this.size}
          name=${this.icon}
        ></wui-icon>
      </button>
    `}};eu.styles=[U.W5,U.fD,ec],el([(0,r.MZ)()],eu.prototype,"size",void 0),el([(0,r.MZ)({type:Boolean})],eu.prototype,"disabled",void 0),el([(0,r.MZ)()],eu.prototype,"icon",void 0),el([(0,r.MZ)()],eu.prototype,"iconColor",void 0),el([(0,r.MZ)()],eu.prototype,"variant",void 0),eu=el([(0,D.E)("wui-icon-link")],eu),i(26670),i(75484);let ed=(0,a.JW)`<svg width="86" height="96" fill="none">
  <path
    d="M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z"
  />
</svg>`;var ep=i(27313);let eh=(0,a.JW)`
  <svg fill="none" viewBox="0 0 36 40">
    <path
      d="M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z"
    />
  </svg>
`,em=(0,M.AH)`
  :host {
    position: relative;
    border-radius: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-width);
    height: var(--local-height);
  }

  :host([data-round='true']) {
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: 100%;
    outline: 1px solid ${({tokens:e})=>e.core.glass010};
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  svg > path {
    stroke: var(--local-stroke);
  }

  wui-image {
    width: 100%;
    height: 100%;
    -webkit-clip-path: var(--local-path);
    clip-path: var(--local-path);
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-icon {
    transform: translateY(-5%);
    width: var(--local-icon-size);
    height: var(--local-icon-size);
  }
`;var ew=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let eg=class extends a.WF{constructor(){super(...arguments),this.size="md",this.name="uknown",this.networkImagesBySize={sm:eh,md:ep.a,lg:ed},this.selected=!1,this.round=!1}render(){return this.round?(this.dataset.round="true",this.style.cssText=`
      --local-width: var(--apkt-spacing-10);
      --local-height: var(--apkt-spacing-10);
      --local-icon-size: var(--apkt-spacing-4);
    `):this.style.cssText=`

      --local-path: var(--apkt-path-network-${this.size});
      --local-width:  var(--apkt-width-network-${this.size});
      --local-height:  var(--apkt-height-network-${this.size});
      --local-icon-size:  var(--apkt-spacing-${({sm:"4",md:"6",lg:"10"})[this.size]});
    `,(0,a.qy)`${this.templateVisual()} ${this.svgTemplate()} `}svgTemplate(){return this.round?null:this.networkImagesBySize[this.size]}templateVisual(){return this.imageSrc?(0,a.qy)`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:(0,a.qy)`<wui-icon size="inherit" color="default" name="networkPlaceholder"></wui-icon>`}};eg.styles=[U.W5,em],ew([(0,r.MZ)()],eg.prototype,"size",void 0),ew([(0,r.MZ)()],eg.prototype,"name",void 0),ew([(0,r.MZ)({type:Object})],eg.prototype,"networkImagesBySize",void 0),ew([(0,r.MZ)()],eg.prototype,"imageSrc",void 0),ew([(0,r.MZ)({type:Boolean})],eg.prototype,"selected",void 0),ew([(0,r.MZ)({type:Boolean})],eg.prototype,"round",void 0),eg=ew([(0,D.E)("wui-network-image")],eg);let ey=(0,M.AH)`
  :host {
    position: relative;
    display: flex;
    width: 100%;
    height: 1px;
    background-color: ${({tokens:e})=>e.theme.borderPrimary};
    justify-content: center;
    align-items: center;
  }

  :host > wui-text {
    position: absolute;
    padding: 0px 8px;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  :host([data-bg-color='primary']) > wui-text {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  :host([data-bg-color='secondary']) > wui-text {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }
`;var ef=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let eb=class extends a.WF{constructor(){super(...arguments),this.text="",this.bgColor="primary"}render(){return this.dataset.bgColor=this.bgColor,(0,a.qy)`${this.template()}`}template(){return this.text?(0,a.qy)`<wui-text variant="md-regular" color="secondary">${this.text}</wui-text>`:null}};eb.styles=[U.W5,ey],ef([(0,r.MZ)()],eb.prototype,"text",void 0),ef([(0,r.MZ)()],eb.prototype,"bgColor",void 0),eb=ef([(0,D.E)("wui-separator")],eb),i(1805);var ev=i(65103),ek=i(79355);let ex={INVALID_PAYMENT_CONFIG:"INVALID_PAYMENT_CONFIG",INVALID_RECIPIENT:"INVALID_RECIPIENT",INVALID_ASSET:"INVALID_ASSET",INVALID_AMOUNT:"INVALID_AMOUNT",UNKNOWN_ERROR:"UNKNOWN_ERROR",UNABLE_TO_INITIATE_PAYMENT:"UNABLE_TO_INITIATE_PAYMENT",INVALID_CHAIN_NAMESPACE:"INVALID_CHAIN_NAMESPACE",GENERIC_PAYMENT_ERROR:"GENERIC_PAYMENT_ERROR",UNABLE_TO_GET_EXCHANGES:"UNABLE_TO_GET_EXCHANGES",ASSET_NOT_SUPPORTED:"ASSET_NOT_SUPPORTED",UNABLE_TO_GET_PAY_URL:"UNABLE_TO_GET_PAY_URL",UNABLE_TO_GET_BUY_STATUS:"UNABLE_TO_GET_BUY_STATUS",UNABLE_TO_GET_TOKEN_BALANCES:"UNABLE_TO_GET_TOKEN_BALANCES",UNABLE_TO_GET_QUOTE:"UNABLE_TO_GET_QUOTE",UNABLE_TO_GET_QUOTE_STATUS:"UNABLE_TO_GET_QUOTE_STATUS",INVALID_RECIPIENT_ADDRESS_FOR_ASSET:"INVALID_RECIPIENT_ADDRESS_FOR_ASSET"},eT={[ex.INVALID_PAYMENT_CONFIG]:"Invalid payment configuration",[ex.INVALID_RECIPIENT]:"Invalid recipient address",[ex.INVALID_ASSET]:"Invalid asset specified",[ex.INVALID_AMOUNT]:"Invalid payment amount",[ex.INVALID_RECIPIENT_ADDRESS_FOR_ASSET]:"Invalid recipient address for the asset selected",[ex.UNKNOWN_ERROR]:"Unknown payment error occurred",[ex.UNABLE_TO_INITIATE_PAYMENT]:"Unable to initiate payment",[ex.INVALID_CHAIN_NAMESPACE]:"Invalid chain namespace",[ex.GENERIC_PAYMENT_ERROR]:"Unable to process payment",[ex.UNABLE_TO_GET_EXCHANGES]:"Unable to get exchanges",[ex.ASSET_NOT_SUPPORTED]:"Asset not supported by the selected exchange",[ex.UNABLE_TO_GET_PAY_URL]:"Unable to get payment URL",[ex.UNABLE_TO_GET_BUY_STATUS]:"Unable to get buy status",[ex.UNABLE_TO_GET_TOKEN_BALANCES]:"Unable to get token balances",[ex.UNABLE_TO_GET_QUOTE]:"Unable to get quote. Please choose a different token",[ex.UNABLE_TO_GET_QUOTE_STATUS]:"Unable to get quote status"};class eA extends Error{get message(){return eT[this.code]}constructor(e,t){super(eT[e]),this.name="AppKitPayError",this.code=e,this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,eA)}}var eS=i(32464);let eI="reown_test";var eE=i(425),eP=i(32009);async function eC(e,t,i){if(t!==v.o.CHAIN.EVM)throw new eA(ex.INVALID_CHAIN_NAMESPACE);if(!i.fromAddress)throw new eA(ex.INVALID_PAYMENT_CONFIG,"fromAddress is required for native EVM payments.");let a="string"==typeof i.amount?parseFloat(i.amount):i.amount;if(isNaN(a))throw new eA(ex.INVALID_PAYMENT_CONFIG);let r=e.metadata?.decimals??18,o=p.x.parseUnits(a.toString(),r);if("bigint"!=typeof o)throw new eA(ex.GENERIC_PAYMENT_ERROR);return await p.x.sendTransaction({chainNamespace:t,to:i.recipient,address:i.fromAddress,value:o,data:"0x"})??void 0}async function e$(e,t){if(!t.fromAddress)throw new eA(ex.INVALID_PAYMENT_CONFIG,"fromAddress is required for ERC20 EVM payments.");let i=e.asset,a=t.recipient,r=Number(e.metadata.decimals),o=p.x.parseUnits(t.amount.toString(),r);if(void 0===o)throw new eA(ex.GENERIC_PAYMENT_ERROR);return await p.x.writeContract({fromAddress:t.fromAddress,tokenAddress:i,args:[a,o],method:"transfer",abi:eE.v.getERC20Abi(i),chainNamespace:v.o.CHAIN.EVM})??void 0}async function eN(e,t){if(e!==v.o.CHAIN.SOLANA)throw new eA(ex.INVALID_CHAIN_NAMESPACE);if(!t.fromAddress)throw new eA(ex.INVALID_PAYMENT_CONFIG,"fromAddress is required for Solana payments.");let i="string"==typeof t.amount?parseFloat(t.amount):t.amount;if(isNaN(i)||i<=0)throw new eA(ex.INVALID_PAYMENT_CONFIG,"Invalid payment amount.");try{if(!eP.G.getProvider(e))throw new eA(ex.GENERIC_PAYMENT_ERROR,"No Solana provider available.");let a=await p.x.sendTransaction({chainNamespace:v.o.CHAIN.SOLANA,to:t.recipient,value:i,tokenMint:t.tokenMint});if(!a)throw new eA(ex.GENERIC_PAYMENT_ERROR,"Transaction failed.");return a}catch(e){if(e instanceof eA)throw e;throw new eA(ex.GENERIC_PAYMENT_ERROR,`Solana payment failed: ${e}`)}}async function eR({sourceToken:e,toToken:t,amount:i,recipient:a}){let r=p.x.parseUnits(i,e.metadata.decimals),o=p.x.parseUnits(i,t.metadata.decimals);return Promise.resolve({type:eQ,origin:{amount:r?.toString()??"0",currency:e},destination:{amount:o?.toString()??"0",currency:t},fees:[{id:"service",label:"Service Fee",amount:"0",currency:t}],steps:[{requestId:eQ,type:"deposit",deposit:{amount:r?.toString()??"0",currency:e.asset,receiver:a}}],timeInSeconds:6})}function eO(e){if(!e)return null;let t=e.steps[0];return t&&t.type===eJ?t:null}function eq(e,t=0){if(!e)return[];let i=e.steps.filter(e=>e.type===eX),a=i.filter((e,i)=>i+1>t);return i.length>0&&i.length<3?a:[]}let eW=new eS.Z({baseUrl:S.w.getApiUrl(),clientId:null});class e_ extends Error{}function eU(){let{projectId:e,sdkType:t,sdkVersion:i}=n.H.state;return{projectId:e,st:t||"appkit",sv:i||"html-wagmi-4.2.2"}}async function eD(e,t){let i=function(){let e=n.H.getSnapshot().projectId;return`https://rpc.walletconnect.org/v1/json-rpc?projectId=${e}`}(),{sdkType:a,sdkVersion:r,projectId:o}=n.H.getSnapshot(),s={jsonrpc:"2.0",id:1,method:e,params:{...t||{},st:a,sv:r,projectId:o}},c=await fetch(i,{method:"POST",body:JSON.stringify(s),headers:{"Content-Type":"application/json"}}),l=await c.json();if(l.error)throw new e_(l.error.message);return l}async function eM(e){return(await eD("reown_getExchanges",e)).result}async function eL(e){return(await eD("reown_getExchangePayUrl",e)).result}async function eF(e){return(await eD("reown_getExchangeBuyStatus",e)).result}async function ez(e){let t=b.S.bigNumber(e.amount).times(10**e.toToken.metadata.decimals).toString(),{chainId:i,chainNamespace:a}=ev.C.parseCaipNetworkId(e.sourceToken.network),{chainId:r,chainNamespace:o}=ev.C.parseCaipNetworkId(e.toToken.network),n="native"===e.sourceToken.asset?(0,T.NH)(a):e.sourceToken.asset,s="native"===e.toToken.asset?(0,T.NH)(o):e.toToken.asset;return await eW.post({path:"/appkit/v1/transfers/quote",body:{user:e.address,originChainId:i.toString(),originCurrency:n,destinationChainId:r.toString(),destinationCurrency:s,recipient:e.recipient,amount:t},params:eU()})}async function eB(e){let t=ek.y.isLowerCaseMatch(e.sourceToken.network,e.toToken.network),i=ek.y.isLowerCaseMatch(e.sourceToken.asset,e.toToken.asset);return t&&i?eR(e):ez(e)}async function ej(e){return await eW.get({path:"/appkit/v1/transfers/status",params:{requestId:e.requestId,...eU()}})}async function eH(e){return await eW.get({path:`/appkit/v1/transfers/assets/exchanges/${e}`,params:eU()})}let eV=["eip155","solana"],eG={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}};function eZ(e,t){let{chainNamespace:i,chainId:a}=ev.C.parseCaipNetworkId(e),r=eG[i];if(!r)throw Error(`Unsupported chain namespace for CAIP-19 formatting: ${i}`);let o=r.native.assetNamespace,n=r.native.assetReference;"native"!==t&&(o=r.defaultTokenNamespace,n=t);let s=`${i}:${a}`;return`${s}/${o}:${n}`}function eY(e){let t=b.S.bigNumber(e,{safe:!0});return t.lt(.001)?"<0.001":t.round(4).toString()}let eK="unknown",eQ="direct-transfer",eJ="deposit",eX="transaction",e0=(0,y.BX)({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0,choice:"pay",tokenBalances:{[v.o.CHAIN.EVM]:[],[v.o.CHAIN.SOLANA]:[]},isFetchingTokenBalances:!1,selectedPaymentAsset:null,quote:void 0,quoteStatus:"waiting",quoteError:null,isFetchingQuote:!1,selectedExchange:void 0,exchangeUrlForQuote:void 0,requestId:void 0}),e3={state:e0,subscribe:e=>(0,y.B1)(e0,()=>e(e0)),subscribeKey:(e,t)=>(0,f.u$)(e0,e,t),async handleOpenPay(e){this.resetState(),this.setPaymentConfig(e),this.initializeAnalytics();let{chainNamespace:t}=ev.C.parseCaipNetworkId(e3.state.paymentAsset.network);if(!S.w.isAddress(e3.state.recipient,t))throw new eA(ex.INVALID_RECIPIENT_ADDRESS_FOR_ASSET,`Provide valid recipient address for namespace "${t}"`);await this.prepareTokenLogo(),e0.isConfigured=!0,N.E.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:e0.exchanges,configuration:{network:e0.paymentAsset.network,asset:e0.paymentAsset.asset,recipient:e0.recipient,amount:e0.amount}}}),await s.W.open({view:"Pay"})},resetState(){e0.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},e0.recipient="0x0",e0.amount=0,e0.isConfigured=!1,e0.error=null,e0.isPaymentInProgress=!1,e0.isLoading=!1,e0.currentPayment=void 0,e0.selectedExchange=void 0,e0.exchangeUrlForQuote=void 0,e0.requestId=void 0},resetQuoteState(){e0.quote=void 0,e0.quoteStatus="waiting",e0.quoteError=null,e0.isFetchingQuote=!1,e0.requestId=void 0},setPaymentConfig(e){if(!e.paymentAsset)throw new eA(ex.INVALID_PAYMENT_CONFIG);try{e0.choice=e.choice??"pay",e0.paymentAsset=e.paymentAsset,e0.recipient=e.recipient,e0.amount=e.amount,e0.openInNewTab=e.openInNewTab??!0,e0.redirectUrl=e.redirectUrl,e0.payWithExchange=e.payWithExchange,e0.error=null}catch(e){throw new eA(ex.INVALID_PAYMENT_CONFIG,e.message)}},setSelectedPaymentAsset(e){e0.selectedPaymentAsset=e},setSelectedExchange(e){e0.selectedExchange=e},setRequestId(e){e0.requestId=e},setPaymentInProgress(e){e0.isPaymentInProgress=e},getPaymentAsset:()=>e0.paymentAsset,getExchanges:()=>e0.exchanges,async fetchExchanges(){try{e0.isLoading=!0,e0.exchanges=(await eM({page:0})).exchanges.slice(0,2)}catch(e){throw g.P.showError(eT.UNABLE_TO_GET_EXCHANGES),new eA(ex.UNABLE_TO_GET_EXCHANGES)}finally{e0.isLoading=!1}},async getAvailableExchanges(e){try{let t=e?.asset&&e?.network?eZ(e.network,e.asset):void 0;return await eM({page:e?.page??0,asset:t,amount:e?.amount?.toString()})}catch(e){throw new eA(ex.UNABLE_TO_GET_EXCHANGES)}},async getPayUrl(e,t,i=!1){try{let a=Number(t.amount),r=await eL({exchangeId:e,asset:eZ(t.network,t.asset),amount:a.toString(),recipient:`${t.network}:${t.recipient}`});return N.E.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{source:"pay",exchange:{id:e},configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:a},currentPayment:{type:"exchange",exchangeId:e},headless:i}}),i&&(this.initiatePayment(),N.E.sendEvent({type:"track",event:"PAY_INITIATED",properties:{source:"pay",paymentId:e0.paymentId||eK,configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:a},currentPayment:{type:"exchange",exchangeId:e}}})),r}catch(e){if(e instanceof Error&&e.message.includes("is not supported"))throw new eA(ex.ASSET_NOT_SUPPORTED);throw Error(e.message)}},async generateExchangeUrlForQuote({exchangeId:e,paymentAsset:t,amount:i,recipient:a}){let r=await eL({exchangeId:e,asset:eZ(t.network,t.asset),amount:i.toString(),recipient:a});e0.exchangeSessionId=r.sessionId,e0.exchangeUrlForQuote=r.url},async openPayUrl(e,t,i=!1){try{let a=await this.getPayUrl(e.exchangeId,t,i);if(!a)throw new eA(ex.UNABLE_TO_GET_PAY_URL);let r=e.openInNewTab??!0;return S.w.openHref(a.url,r?"_blank":"_self"),a}catch(e){throw e instanceof eA?e0.error=e.message:e0.error=eT.GENERIC_PAYMENT_ERROR,new eA(ex.UNABLE_TO_GET_PAY_URL)}},async onTransfer({chainNamespace:e,fromAddress:t,toAddress:i,amount:a,paymentAsset:r}){if(e0.currentPayment={type:"wallet",status:"IN_PROGRESS"},!e0.isPaymentInProgress)try{this.initiatePayment();let o=c.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===r.network);if(!o)throw Error("Target network not found");let n=c.W.state.activeCaipNetwork;switch(!ek.y.isLowerCaseMatch(n?.caipNetworkId,o.caipNetworkId)&&await c.W.switchActiveNetwork(o),e){case v.o.CHAIN.EVM:"native"===r.asset&&(e0.currentPayment.result=await eC(r,e,{recipient:i,amount:a,fromAddress:t})),r.asset.startsWith("0x")&&(e0.currentPayment.result=await e$(r,{recipient:i,amount:a,fromAddress:t})),e0.currentPayment.status="SUCCESS";break;case v.o.CHAIN.SOLANA:e0.currentPayment.result=await eN(e,{recipient:i,amount:a,fromAddress:t,tokenMint:"native"===r.asset?void 0:r.asset}),e0.currentPayment.status="SUCCESS";break;default:throw new eA(ex.INVALID_CHAIN_NAMESPACE)}}catch(e){throw e instanceof eA?e0.error=e.message:e0.error=eT.GENERIC_PAYMENT_ERROR,e0.currentPayment.status="FAILED",g.P.showError(e0.error),e}finally{e0.isPaymentInProgress=!1}},async onSendTransaction(e){try{let{namespace:t,transactionStep:i}=e;e3.initiatePayment();let a=c.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===e0.paymentAsset?.network);if(!a)throw Error("Target network not found");let r=c.W.state.activeCaipNetwork;if(ek.y.isLowerCaseMatch(r?.caipNetworkId,a.caipNetworkId)||await c.W.switchActiveNetwork(a),t===v.o.CHAIN.EVM){let{from:e,to:a,data:r,value:o}=i.transaction;await p.x.sendTransaction({address:e,to:a,data:r,value:BigInt(o),chainNamespace:t})}else if(t===v.o.CHAIN.SOLANA){let{instructions:e}=i.transaction;await p.x.writeSolanaTransaction({instructions:e})}}catch(e){throw e instanceof eA?e0.error=e.message:e0.error=eT.GENERIC_PAYMENT_ERROR,g.P.showError(e0.error),e}finally{e0.isPaymentInProgress=!1}},getExchangeById:e=>e0.exchanges.find(t=>t.id===e),validatePayConfig(e){let{paymentAsset:t,recipient:i,amount:a}=e;if(!t)throw new eA(ex.INVALID_PAYMENT_CONFIG);if(!i)throw new eA(ex.INVALID_RECIPIENT);if(!t.asset)throw new eA(ex.INVALID_ASSET);if(null==a||a<=0)throw new eA(ex.INVALID_AMOUNT)},async handlePayWithExchange(e){try{e0.currentPayment={type:"exchange",exchangeId:e};let{network:t,asset:i}=e0.paymentAsset,a={network:t,asset:i,amount:e0.amount,recipient:e0.recipient},r=await this.getPayUrl(e,a);if(!r)throw new eA(ex.UNABLE_TO_INITIATE_PAYMENT);return e0.currentPayment.sessionId=r.sessionId,e0.currentPayment.status="IN_PROGRESS",e0.currentPayment.exchangeId=e,this.initiatePayment(),{url:r.url,openInNewTab:e0.openInNewTab}}catch(e){return e instanceof eA?e0.error=e.message:e0.error=eT.GENERIC_PAYMENT_ERROR,e0.isPaymentInProgress=!1,g.P.showError(e0.error),null}},async getBuyStatus(e,t){try{let i=await eF({sessionId:t,exchangeId:e});return("SUCCESS"===i.status||"FAILED"===i.status)&&N.E.sendEvent({type:"track",event:"SUCCESS"===i.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===i.status?S.w.parseError(e0.error):void 0,source:"pay",paymentId:e0.paymentId||eK,configuration:{network:e0.paymentAsset.network,asset:e0.paymentAsset.asset,recipient:e0.recipient,amount:e0.amount},currentPayment:{type:"exchange",exchangeId:e0.currentPayment?.exchangeId,sessionId:e0.currentPayment?.sessionId,result:i.txHash}}}),i}catch(e){throw new eA(ex.UNABLE_TO_GET_BUY_STATUS)}},async fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:i}){if(!e)return[];let{address:a}=ev.C.parseCaipAddress(e),r=t;return i===v.o.CHAIN.EVM&&(r=void 0),await x.Z.getMyTokensWithBalance({address:a,caipNetwork:r})},async fetchTokensFromExchange(){if(!e0.selectedExchange)return[];let e=Object.values((await eH(e0.selectedExchange.id)).assets).flat();return await Promise.all(e.map(async e=>{let t={chainId:e.network,address:`${e.network}:${e.asset}`,symbol:e.metadata.symbol,name:e.metadata.name,iconUrl:e.metadata.logoURI||"",price:0,quantity:{numeric:"0",decimals:e.metadata.decimals.toString()}},{chainNamespace:i}=ev.C.parseCaipNetworkId(t.chainId),a=t.address;if(S.w.isCaipAddress(a)){let{address:e}=ev.C.parseCaipAddress(a);a=e}return t.iconUrl=await K.$.getImageByToken(a??"",i).catch(()=>void 0)??"",t}))},async fetchTokens({caipAddress:e,caipNetwork:t,namespace:i}){try{e0.isFetchingTokenBalances=!0;let a=e0.selectedExchange?this.fetchTokensFromExchange():this.fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:i}),r=await a;e0.tokenBalances={...e0.tokenBalances,[i]:r}}catch(t){let e=t instanceof Error?t.message:"Unable to get token balances";g.P.showError(e)}finally{e0.isFetchingTokenBalances=!1}},async fetchQuote({amount:e,address:t,sourceToken:i,toToken:a,recipient:r}){try{e3.resetQuoteState(),e0.isFetchingQuote=!0;let o=await eB({amount:e,address:e0.selectedExchange?void 0:t,sourceToken:i,toToken:a,recipient:r});if(e0.selectedExchange){let e=eO(o);if(e){let t=`${i.network}:${e.deposit.receiver}`,a=b.S.formatNumber(e.deposit.amount,{decimals:i.metadata.decimals??0,round:8});await e3.generateExchangeUrlForQuote({exchangeId:e0.selectedExchange.id,paymentAsset:i,amount:a.toString(),recipient:t})}}e0.quote=o}catch(t){let e=eT.UNABLE_TO_GET_QUOTE;if(t instanceof Error&&t.cause&&t.cause instanceof Response)try{let i=await t.cause.json();i.error&&"string"==typeof i.error&&(e=i.error)}catch{}throw e0.quoteError=e,g.P.showError(e),new eA(ex.UNABLE_TO_GET_QUOTE)}finally{e0.isFetchingQuote=!1}},async fetchQuoteStatus({requestId:e}){try{if(e===eQ){let e=e0.selectedExchange,t=e0.exchangeSessionId;if(e&&t){switch((await this.getBuyStatus(e.id,t)).status){case"IN_PROGRESS":case"UNKNOWN":default:e0.quoteStatus="waiting";break;case"SUCCESS":e0.quoteStatus="success",e0.isPaymentInProgress=!1;break;case"FAILED":e0.quoteStatus="failure",e0.isPaymentInProgress=!1}return}e0.quoteStatus="success";return}let{status:t}=await ej({requestId:e});e0.quoteStatus=t}catch{throw e0.quoteStatus="failure",new eA(ex.UNABLE_TO_GET_QUOTE_STATUS)}},initiatePayment(){e0.isPaymentInProgress=!0,e0.paymentId=crypto.randomUUID()},initializeAnalytics(){e0.analyticsSet||(e0.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",e=>{if(e0.currentPayment?.status&&"UNKNOWN"!==e0.currentPayment.status){let e={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[e0.currentPayment.status];N.E.sendEvent({type:"track",event:e,properties:{message:"FAILED"===e0.currentPayment.status?S.w.parseError(e0.error):void 0,source:"pay",paymentId:e0.paymentId||eK,configuration:{network:e0.paymentAsset.network,asset:e0.paymentAsset.asset,recipient:e0.recipient,amount:e0.amount},currentPayment:{type:e0.currentPayment.type,exchangeId:e0.currentPayment.exchangeId,sessionId:e0.currentPayment.sessionId,result:e0.currentPayment.result}}})}}))},async prepareTokenLogo(){if(!e0.paymentAsset.metadata.logoURI)try{let{chainNamespace:e}=ev.C.parseCaipNetworkId(e0.paymentAsset.network),t=await K.$.getImageByToken(e0.paymentAsset.asset,e);e0.paymentAsset.metadata.logoURI=t}catch{}}},e1=(0,_.AH)`
  wui-separator {
    margin: var(--apkt-spacing-3) calc(var(--apkt-spacing-3) * -1) var(--apkt-spacing-2)
      calc(var(--apkt-spacing-3) * -1);
    width: calc(100% + var(--apkt-spacing-3) * 2);
  }

  .token-display {
    padding: var(--apkt-spacing-3) var(--apkt-spacing-3);
    border-radius: var(--apkt-borderRadius-5);
    background-color: var(--apkt-tokens-theme-backgroundPrimary);
    margin-top: var(--apkt-spacing-3);
    margin-bottom: var(--apkt-spacing-3);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--apkt-spacing-2);
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 40px;
    height: 40px;
  }

  .chain-image {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[8]};
    border-top-left-radius: ${({borderRadius:e})=>e[8]};
  }
`;var e2=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let e5=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.amount=e3.state.amount,this.namespace=void 0,this.paymentAsset=e3.state.paymentAsset,this.activeConnectorIds=l.a.state.activeConnectorIds,this.caipAddress=void 0,this.exchanges=e3.state.exchanges,this.isLoading=e3.state.isLoading,this.initializeNamespace(),this.unsubscribe.push(e3.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(l.a.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(e3.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(e3.subscribeKey("isLoading",e=>this.isLoading=e)),e3.fetchExchanges(),e3.setSelectedExchange(void 0)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return(0,a.qy)`
      <wui-flex flexDirection="column">
        ${this.paymentDetailsTemplate()} ${this.paymentMethodsTemplate()}
      </wui-flex>
    `}paymentMethodsTemplate(){return(0,a.qy)`
      <wui-flex flexDirection="column" padding="3" gap="2" class="payment-methods-container">
        ${this.payWithWalletTemplate()} ${this.templateSeparator()}
        ${this.templateExchangeOptions()}
      </wui-flex>
    `}initializeNamespace(){let e=c.W.state.activeChain;this.namespace=e,this.caipAddress=c.W.getAccountData(e)?.caipAddress,this.unsubscribe.push(c.W.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},e))}paymentDetailsTemplate(){let e=c.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return(0,a.qy)`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        .padding=${["6","8","6","8"]}
        gap="2"
      >
        <wui-flex alignItems="center" gap="1">
          <wui-text variant="h1-regular" color="primary">
            ${eY(this.amount||"0")}
          </wui-text>

          <wui-flex flexDirection="column">
            <wui-text variant="h6-regular" color="secondary">
              ${this.paymentAsset.metadata.symbol||"Unknown"}
            </wui-text>
            <wui-text variant="md-medium" color="secondary"
              >on ${e?.name||"Unknown"}</wui-text
            >
          </wui-flex>
        </wui-flex>

        <wui-flex class="left-image-container">
          <wui-image
            src=${(0,o.J)(this.paymentAsset.metadata.logoURI)}
            class="token-image"
          ></wui-image>
          <wui-image
            src=${(0,o.J)(K.$.getNetworkImage(e))}
            class="chain-image"
          ></wui-image>
        </wui-flex>
      </wui-flex>
    `}payWithWalletTemplate(){return!function(e){let{chainNamespace:t}=ev.C.parseCaipNetworkId(e);return eV.includes(t)}(this.paymentAsset.network)?(0,a.qy)``:this.caipAddress?this.connectedWalletTemplate():this.disconnectedWalletTemplate()}connectedWalletTemplate(){let{name:e,image:t}=this.getWalletProperties({namespace:this.namespace});return(0,a.qy)`
      <wui-flex flexDirection="column" gap="3">
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${this.onWalletPayment}
          .boxed=${!1}
          ?chevron=${!0}
          ?fullSize=${!1}
          ?rounded=${!0}
          data-testid="wallet-payment-option"
          imageSrc=${(0,o.J)(t)}
          imageSize="3xl"
        >
          <wui-text variant="lg-regular" color="primary">Pay with ${e}</wui-text>
        </wui-list-item>

        <wui-list-item
          type="secondary"
          icon="power"
          iconColor="error"
          @click=${this.onDisconnect}
          data-testid="disconnect-button"
          ?chevron=${!1}
          boxColor="foregroundSecondary"
        >
          <wui-text variant="lg-regular" color="secondary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `}disconnectedWalletTemplate(){return(0,a.qy)`<wui-list-item
      type="secondary"
      boxColor="foregroundSecondary"
      variant="icon"
      iconColor="default"
      iconVariant="overlay"
      icon="wallet"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="lg-regular" color="primary">Pay with wallet</wui-text>
    </wui-list-item>`}templateExchangeOptions(){if(this.isLoading)return(0,a.qy)`<wui-flex justifyContent="center" alignItems="center">
        <wui-loading-spinner size="md"></wui-loading-spinner>
      </wui-flex>`;let e=this.exchanges.filter(e=>!function(e){let t=c.W.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===e.network);return!!t&&!!t.testnet}(this.paymentAsset)?e.id!==eI:e.id===eI);return 0===e.length?(0,a.qy)`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="md-medium" color="primary">No exchanges available</wui-text>
      </wui-flex>`:e.map(e=>(0,a.qy)`
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${()=>this.onExchangePayment(e)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          imageSrc=${(0,o.J)(e.imageUrl)}
        >
          <wui-text flexGrow="1" variant="lg-regular" color="primary">
            Pay with ${e.name}
          </wui-text>
        </wui-list-item>
      `)}templateSeparator(){return(0,a.qy)`<wui-separator text="or" bgColor="secondary"></wui-separator>`}async onWalletPayment(){if(!this.namespace)throw Error("Namespace not found");this.caipAddress?d.I.push("PayQuote"):(await l.a.connect(),await s.W.open({view:"PayQuote"}))}onExchangePayment(e){e3.setSelectedExchange(e),d.I.push("PayQuote")}async onDisconnect(){try{await p.x.disconnect(),await s.W.open({view:"Pay"})}catch{console.error("Failed to disconnect"),g.P.showError("Failed to disconnect")}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=l.a.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let a=K.$.getConnectorImage(i);return{name:i.name,image:a}}};e5.styles=e1,e2([(0,r.wk)()],e5.prototype,"amount",void 0),e2([(0,r.wk)()],e5.prototype,"namespace",void 0),e2([(0,r.wk)()],e5.prototype,"paymentAsset",void 0),e2([(0,r.wk)()],e5.prototype,"activeConnectorIds",void 0),e2([(0,r.wk)()],e5.prototype,"caipAddress",void 0),e2([(0,r.wk)()],e5.prototype,"exchanges",void 0),e2([(0,r.wk)()],e5.prototype,"isLoading",void 0),e5=e2([(0,_.EM)("w3m-pay-view")],e5);var e4=i(2354);let e6=(0,M.AH)`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-container {
    position: relative;
    width: var(--pulse-size);
    height: var(--pulse-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--pulse-color);
    opacity: 0;
    animation: pulse var(--pulse-duration, 2s) ease-out infinite;
  }

  .pulse-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: var(--pulse-opacity, 0.3);
    }
    50% {
      opacity: calc(var(--pulse-opacity, 0.3) * 0.5);
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;var e8=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let e7={"accent-primary":M.f.tokens.core.backgroundAccentPrimary},e9=class extends a.WF{constructor(){super(...arguments),this.rings=3,this.duration=2,this.opacity=.3,this.size="200px",this.variant="accent-primary"}render(){let e=e7[this.variant];this.style.cssText=`
      --pulse-size: ${this.size};
      --pulse-duration: ${this.duration}s;
      --pulse-color: ${e};
      --pulse-opacity: ${this.opacity};
    `;let t=Array.from({length:this.rings},(e,t)=>this.renderRing(t,this.rings));return(0,a.qy)`
      <div class="pulse-container">
        <div class="pulse-rings">${t}</div>
        <div class="pulse-content">
          <slot></slot>
        </div>
      </div>
    `}renderRing(e,t){let i=e/t*this.duration,r=`animation-delay: ${i}s;`;return(0,a.qy)`<div class="pulse-ring" style=${r}></div>`}};e9.styles=[U.W5,e6],e8([(0,r.MZ)({type:Number})],e9.prototype,"rings",void 0),e8([(0,r.MZ)({type:Number})],e9.prototype,"duration",void 0),e8([(0,r.MZ)({type:Number})],e9.prototype,"opacity",void 0),e8([(0,r.MZ)()],e9.prototype,"size",void 0),e8([(0,r.MZ)()],e9.prototype,"variant",void 0),e9=e8([(0,D.E)("wui-pulse")],e9);let te=[{id:"received",title:"Receiving funds",icon:"dollar"},{id:"processing",title:"Swapping asset",icon:"recycleHorizontal"},{id:"sending",title:"Sending asset to the recipient address",icon:"send"}],tt=["success","submitted","failure","timeout","refund"],ti=(0,_.AH)`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  .token-badge-container {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${({borderRadius:e})=>e[4]};
    z-index: 3;
    min-width: 105px;
  }

  .token-badge-container.loading {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-badge-container.success {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-image-container {
    position: relative;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 64px;
    height: 64px;
  }

  .token-image.success {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.error {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.loading {
    background: ${({colors:e})=>e.accent010};
  }

  .token-image wui-icon {
    width: 32px;
    height: 32px;
  }

  .token-badge {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  .token-badge wui-text {
    white-space: nowrap;
  }

  .payment-lifecycle-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[6]};
    border-top-left-radius: ${({borderRadius:e})=>e[6]};
  }

  .payment-step-badge {
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  .payment-step-badge.loading {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .payment-step-badge.error {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  .payment-step-badge.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  .step-icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e.round};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .step-icon-box {
    position: absolute;
    right: -4px;
    bottom: -1px;
    padding: 2px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .step-icon-box.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }
`;var ta=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tr={received:["pending","success","submitted"],processing:["success","submitted"],sending:["success","submitted"]},to=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.pollingInterval=null,this.paymentAsset=e3.state.paymentAsset,this.quoteStatus=e3.state.quoteStatus,this.quote=e3.state.quote,this.amount=e3.state.amount,this.namespace=void 0,this.caipAddress=void 0,this.profileName=null,this.activeConnectorIds=l.a.state.activeConnectorIds,this.selectedExchange=e3.state.selectedExchange,this.initializeNamespace(),this.unsubscribe.push(e3.subscribeKey("quoteStatus",e=>this.quoteStatus=e),e3.subscribeKey("quote",e=>this.quote=e),l.a.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e),e3.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}connectedCallback(){super.connectedCallback(),this.startPolling()}disconnectedCallback(){super.disconnectedCallback(),this.stopPolling(),this.unsubscribe.forEach(e=>e())}render(){return(0,a.qy)`
      <wui-flex flexDirection="column" .padding=${["3","0","0","0"]} gap="2">
        ${this.tokenTemplate()} ${this.paymentTemplate()} ${this.paymentLifecycleTemplate()}
      </wui-flex>
    `}tokenTemplate(){let e=eY(this.amount||"0"),t=this.paymentAsset.metadata.symbol??"Unknown",i=c.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network),r="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus;return"success"===this.quoteStatus||"submitted"===this.quoteStatus?(0,a.qy)`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image success">
          <wui-icon name="checkmark" color="success" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:r?(0,a.qy)`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image error">
          <wui-icon name="close" color="error" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:(0,a.qy)`
      <wui-flex alignItems="center" justifyContent="center">
        <wui-flex class="token-image-container">
          <wui-pulse size="125px" rings="3" duration="4" opacity="0.5" variant="accent-primary">
            <wui-flex justifyContent="center" alignItems="center" class="token-image loading">
              <wui-icon name="paperPlaneTitle" color="accent-primary" size="inherit"></wui-icon>
            </wui-flex>
          </wui-pulse>

          <wui-flex
            justifyContent="center"
            alignItems="center"
            class="token-badge-container loading"
          >
            <wui-flex
              alignItems="center"
              justifyContent="center"
              gap="01"
              padding="1"
              class="token-badge"
            >
              <wui-image
                src=${(0,o.J)(K.$.getNetworkImage(i))}
                class="chain-image"
                size="mdl"
              ></wui-image>

              <wui-text variant="lg-regular" color="primary">${e} ${t}</wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}paymentTemplate(){return(0,a.qy)`
      <wui-flex flexDirection="column" gap="2" .padding=${["0","6","0","6"]}>
        ${this.renderPayment()}
        <wui-separator></wui-separator>
        ${this.renderWallet()}
      </wui-flex>
    `}paymentLifecycleTemplate(){let e=this.getStepsWithStatus();return(0,a.qy)`
      <wui-flex flexDirection="column" padding="4" gap="2" class="payment-lifecycle-container">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">PAYMENT CYCLE</wui-text>

          ${this.renderPaymentCycleBadge()}
        </wui-flex>

        <wui-flex flexDirection="column" gap="5" .padding=${["2","0","2","0"]}>
          ${e.map(e=>this.renderStep(e))}
        </wui-flex>
      </wui-flex>
    `}renderPaymentCycleBadge(){let e="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus,t="success"===this.quoteStatus||"submitted"===this.quoteStatus;if(e)return(0,a.qy)`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge error"
          gap="1"
        >
          <wui-icon name="close" color="error" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="error">Failed</wui-text>
        </wui-flex>
      `;if(t)return(0,a.qy)`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge success"
          gap="1"
        >
          <wui-icon name="checkmark" color="success" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="success">Completed</wui-text>
        </wui-flex>
      `;let i=this.quote?.timeInSeconds??0;return(0,a.qy)`
      <wui-flex alignItems="center" justifyContent="space-between" gap="3">
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge loading"
          gap="1"
        >
          <wui-icon name="clock" color="default" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="primary">Est. ${i} sec</wui-text>
        </wui-flex>

        <wui-icon name="chevronBottom" color="default" size="xxs"></wui-icon>
      </wui-flex>
    `}renderPayment(){let e=c.W.getAllRequestedCaipNetworks().find(e=>{let t=this.quote?.origin.currency.network;if(!t)return!1;let{chainId:i}=ev.C.parseCaipNetworkId(t);return ek.y.isLowerCaseMatch(e.id.toString(),i.toString())}),t=eY(b.S.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString()),i=this.quote?.origin.currency.metadata.symbol??"Unknown";return(0,a.qy)`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Payment Method</wui-text>

        <wui-flex flexDirection="column" alignItems="flex-end" gap="1">
          <wui-flex alignItems="center" gap="01">
            <wui-text variant="lg-regular" color="primary">${t}</wui-text>
            <wui-text variant="lg-regular" color="secondary">${i}</wui-text>
          </wui-flex>

          <wui-flex alignItems="center" gap="1">
            <wui-text variant="md-regular" color="secondary">on</wui-text>
            <wui-image
              src=${(0,o.J)(K.$.getNetworkImage(e))}
              size="xs"
            ></wui-image>
            <wui-text variant="md-regular" color="secondary">${e?.name}</wui-text>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderWallet(){return(0,a.qy)`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Wallet</wui-text>

        ${this.renderWalletText()}
      </wui-flex>
    `}renderWalletText(){let{image:e}=this.getWalletProperties({namespace:this.namespace}),{address:t}=this.caipAddress?ev.C.parseCaipAddress(this.caipAddress):{},i=this.selectedExchange?.name;return this.selectedExchange?(0,a.qy)`
        <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
          <wui-text variant="lg-regular" color="primary">${i}</wui-text>
          <wui-image src=${(0,o.J)(this.selectedExchange.imageUrl)} size="mdl"></wui-image>
        </wui-flex>
      `:(0,a.qy)`
      <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
        <wui-text variant="lg-regular" color="primary">
          ${_.Zv.getTruncateString({string:this.profileName||t||i||"",charsStart:this.profileName?16:4,charsEnd:6*!this.profileName,truncate:this.profileName?"end":"middle"})}
        </wui-text>

        <wui-image src=${(0,o.J)(e)} size="mdl"></wui-image>
      </wui-flex>
    `}getStepsWithStatus(){return"failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus?te.map(e=>({...e,status:"failed"})):te.map(e=>{let t=(tr[e.id]??[]).includes(this.quoteStatus)?"completed":"pending";return{...e,status:t}})}renderStep({title:e,icon:t,status:i}){return(0,a.qy)`
      <wui-flex alignItems="center" gap="3">
        <wui-flex justifyContent="center" alignItems="center" class="step-icon-container">
          <wui-icon name=${t} color="default" size="mdl"></wui-icon>

          <wui-flex alignItems="center" justifyContent="center" class=${(0,e4.H)({"step-icon-box":!0,success:"completed"===i})}>
            ${this.renderStatusIndicator(i)}
          </wui-flex>
        </wui-flex>

        <wui-text variant="md-regular" color="primary">${e}</wui-text>
      </wui-flex>
    `}renderStatusIndicator(e){return"completed"===e?(0,a.qy)`<wui-icon size="sm" color="success" name="checkmark"></wui-icon>`:"failed"===e?(0,a.qy)`<wui-icon size="sm" color="error" name="close"></wui-icon>`:"pending"===e?(0,a.qy)`<wui-loading-spinner color="accent-primary" size="sm"></wui-loading-spinner>`:null}startPolling(){this.pollingInterval||(this.fetchQuoteStatus(),this.pollingInterval=setInterval(()=>{this.fetchQuoteStatus()},3e3))}stopPolling(){this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null)}async fetchQuoteStatus(){let e=e3.state.requestId;if(!e||tt.includes(this.quoteStatus))this.stopPolling();else try{await e3.fetchQuoteStatus({requestId:e}),tt.includes(this.quoteStatus)&&this.stopPolling()}catch{this.stopPolling()}}initializeNamespace(){let e=c.W.state.activeChain;this.namespace=e,this.caipAddress=c.W.getAccountData(e)?.caipAddress,this.profileName=c.W.getAccountData(e)?.profileName??null,this.unsubscribe.push(c.W.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null},e))}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=l.a.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let a=K.$.getConnectorImage(i);return{name:i.name,image:a}}};to.styles=ti,ta([(0,r.wk)()],to.prototype,"paymentAsset",void 0),ta([(0,r.wk)()],to.prototype,"quoteStatus",void 0),ta([(0,r.wk)()],to.prototype,"quote",void 0),ta([(0,r.wk)()],to.prototype,"amount",void 0),ta([(0,r.wk)()],to.prototype,"namespace",void 0),ta([(0,r.wk)()],to.prototype,"caipAddress",void 0),ta([(0,r.wk)()],to.prototype,"profileName",void 0),ta([(0,r.wk)()],to.prototype,"activeConnectorIds",void 0),ta([(0,r.wk)()],to.prototype,"selectedExchange",void 0),to=ta([(0,_.EM)("w3m-pay-loading-view")],to);var tn=i(8821);let ts=(0,M.AH)`
  button {
    display: flex;
    align-items: center;
    height: 40px;
    padding: ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[4]};
    column-gap: ${({spacing:e})=>e[1]};
    background-color: transparent;
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  wui-image,
  .icon-box {
    width: ${({spacing:e})=>e[6]};
    height: ${({spacing:e})=>e[6]};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  wui-text {
    flex: 1;
  }

  .icon-box {
    position: relative;
  }

  .icon-box[data-active='true'] {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .circle {
    position: absolute;
    left: 16px;
    top: 15px;
    width: 8px;
    height: 8px;
    background-color: ${({tokens:e})=>e.core.textSuccess};
    box-shadow: 0 0 0 2px ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: 50%;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }
`;var tc=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tl=class extends a.WF{constructor(){super(...arguments),this.address="",this.profileName="",this.alt="",this.imageSrc="",this.icon=void 0,this.iconSize="md",this.enableGreenCircle=!0,this.loading=!1,this.charsStart=4,this.charsEnd=6}render(){return(0,a.qy)`
      <button>
        ${this.leftImageTemplate()} ${this.textTemplate()} ${this.rightImageTemplate()}
      </button>
    `}leftImageTemplate(){let e=this.icon?(0,a.qy)`<wui-icon
          size=${(0,o.J)(this.iconSize)}
          color="default"
          name=${this.icon}
          class="icon"
        ></wui-icon>`:(0,a.qy)`<wui-image src=${this.imageSrc} alt=${this.alt}></wui-image>`;return(0,a.qy)`
      <wui-flex
        alignItems="center"
        justifyContent="center"
        class="icon-box"
        data-active=${!!this.icon}
      >
        ${e}
        ${this.enableGreenCircle?(0,a.qy)`<wui-flex class="circle"></wui-flex>`:null}
      </wui-flex>
    `}textTemplate(){return(0,a.qy)`
      <wui-text variant="lg-regular" color="primary">
        ${tn.Z.getTruncateString({string:this.profileName||this.address,charsStart:this.profileName?16:this.charsStart,charsEnd:this.profileName?0:this.charsEnd,truncate:this.profileName?"end":"middle"})}
      </wui-text>
    `}rightImageTemplate(){return(0,a.qy)`<wui-icon name="chevronBottom" size="sm" color="default"></wui-icon>`}};tl.styles=[U.W5,U.fD,ts],tc([(0,r.MZ)()],tl.prototype,"address",void 0),tc([(0,r.MZ)()],tl.prototype,"profileName",void 0),tc([(0,r.MZ)()],tl.prototype,"alt",void 0),tc([(0,r.MZ)()],tl.prototype,"imageSrc",void 0),tc([(0,r.MZ)()],tl.prototype,"icon",void 0),tc([(0,r.MZ)()],tl.prototype,"iconSize",void 0),tc([(0,r.MZ)({type:Boolean})],tl.prototype,"enableGreenCircle",void 0),tc([(0,r.MZ)({type:Boolean})],tl.prototype,"loading",void 0),tc([(0,r.MZ)({type:Number})],tl.prototype,"charsStart",void 0),tc([(0,r.MZ)({type:Number})],tl.prototype,"charsEnd",void 0),tl=tc([(0,D.E)("wui-wallet-switch")],tl),i(41699);let tu=(0,a.AH)`
  :host {
    display: block;
  }
`,td=class extends a.WF{render(){return(0,a.qy)`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-shimmer width="60px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Network Fee</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-shimmer
              width="75px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>

            <wui-flex alignItems="center" gap="01">
              <wui-shimmer width="14px" height="14px" rounded variant="light"></wui-shimmer>
              <wui-shimmer
                width="49px"
                height="14px"
                borderRadius="4xs"
                variant="light"
              ></wui-shimmer>
            </wui-flex>
          </wui-flex>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Service Fee</wui-text>
          <wui-shimmer width="75px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};td.styles=[tu],td=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}([(0,_.EM)("w3m-pay-fees-skeleton")],td);let tp=(0,_.AH)`
  :host {
    display: block;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }
`;var th=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tm=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.quote=e3.state.quote,this.unsubscribe.push(e3.subscribeKey("quote",e=>this.quote=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=b.S.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0,round:6}).toString();return(0,a.qy)`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-text variant="md-regular" color="primary">
            ${e} ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
          </wui-text>
        </wui-flex>

        ${this.quote&&this.quote.fees.length>0?this.quote.fees.map(e=>this.renderFee(e)):null}
      </wui-flex>
    `}renderFee(e){let t="network"===e.id,i=b.S.formatNumber(e.amount||"0",{decimals:e.currency.metadata.decimals??0,round:6}).toString();if(t){let t=c.W.getAllRequestedCaipNetworks().find(t=>ek.y.isLowerCaseMatch(t.caipNetworkId,e.currency.network));return(0,a.qy)`
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-text variant="md-regular" color="primary">
              ${i} ${e.currency.metadata.symbol||"Unknown"}
            </wui-text>

            <wui-flex alignItems="center" gap="01">
              <wui-image
                src=${(0,o.J)(K.$.getNetworkImage(t))}
                size="xs"
              ></wui-image>
              <wui-text variant="sm-regular" color="secondary">
                ${t?.name||"Unknown"}
              </wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      `}return(0,a.qy)`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>
        <wui-text variant="md-regular" color="primary">
          ${i} ${e.currency.metadata.symbol||"Unknown"}
        </wui-text>
      </wui-flex>
    `}};tm.styles=[tp],th([(0,r.wk)()],tm.prototype,"quote",void 0),tm=th([(0,_.EM)("w3m-pay-fees")],tm);let tw=(0,_.AH)`
  :host {
    display: block;
    width: 100%;
  }

  .disabled-container {
    padding: ${({spacing:e})=>e[2]};
    min-height: 168px;
  }

  wui-icon {
    width: ${({spacing:e})=>e[8]};
    height: ${({spacing:e})=>e[8]};
  }

  wui-flex > wui-text {
    max-width: 273px;
  }
`;var tg=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ty=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.selectedExchange=e3.state.selectedExchange,this.unsubscribe.push(e3.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=!!this.selectedExchange;return(0,a.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
        class="disabled-container"
      >
        <wui-icon name="coins" color="default" size="inherit"></wui-icon>

        <wui-text variant="md-regular" color="primary" align="center">
          You don't have enough funds to complete this transaction
        </wui-text>

        ${e?null:(0,a.qy)`<wui-button
              size="md"
              variant="neutral-secondary"
              @click=${this.dispatchConnectOtherWalletEvent.bind(this)}
              >Connect other wallet</wui-button
            >`}
      </wui-flex>
    `}dispatchConnectOtherWalletEvent(){this.dispatchEvent(new CustomEvent("connectOtherWallet",{detail:!0,bubbles:!0,composed:!0}))}};ty.styles=[tw],tg([(0,r.MZ)({type:Array})],ty.prototype,"selectedExchange",void 0),ty=tg([(0,_.EM)("w3m-pay-options-empty")],ty);let tf=(0,_.AH)`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    min-height: 60px;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    bottom: -3px;
    right: -5px;
    border: 2px solid ${({tokens:e})=>e.theme.foregroundSecondary};
  }
`,tb=class extends a.WF{render(){return(0,a.qy)`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.renderOptionEntry()} ${this.renderOptionEntry()} ${this.renderOptionEntry()}
      </wui-flex>
    `}renderOptionEntry(){return(0,a.qy)`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-shimmer
              width="32px"
              height="32px"
              rounded
              variant="light"
              class="token-image"
            ></wui-shimmer>
            <wui-shimmer
              width="16px"
              height="16px"
              rounded
              variant="light"
              class="chain-image"
            ></wui-shimmer>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-shimmer
              width="74px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
            <wui-shimmer
              width="46px"
              height="14px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}};tb.styles=[tf],tb=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}([(0,_.EM)("w3m-pay-options-skeleton")],tb);let tv=(0,_.AH)`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    mask-image: var(--options-mask-image);
    -webkit-mask-image: var(--options-mask-image);
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    cursor: pointer;
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 32px;
    height: 32px;
  }

  .chain-image {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  @media (hover: hover) and (pointer: fine) {
    .pay-option-container:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }
`;var tk=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tx=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.options=[],this.selectedPaymentAsset=null}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.resizeObserver?.disconnect();let e=this.shadowRoot?.querySelector(".pay-options-container");e?.removeEventListener("scroll",this.handleOptionsListScroll.bind(this))}firstUpdated(){let e=this.shadowRoot?.querySelector(".pay-options-container");e&&(requestAnimationFrame(this.handleOptionsListScroll.bind(this)),e?.addEventListener("scroll",this.handleOptionsListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleOptionsListScroll()}),this.resizeObserver?.observe(e),this.handleOptionsListScroll())}render(){return(0,a.qy)`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.options.map(e=>this.payOptionTemplate(e))}
      </wui-flex>
    `}payOptionTemplate(e){let{network:t,metadata:i,asset:r,amount:n="0"}=e,s=c.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===t),l=`${t}:${r}`,u=`${this.selectedPaymentAsset?.network}:${this.selectedPaymentAsset?.asset}`,d=b.S.bigNumber(n,{safe:!0}),p=d.gt(0);return(0,a.qy)`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        @click=${()=>this.onSelect?.(e)}
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-image
              src=${(0,o.J)(i.logoURI)}
              class="token-image"
              size="3xl"
            ></wui-image>
            <wui-image
              src=${(0,o.J)(K.$.getNetworkImage(s))}
              class="chain-image"
              size="md"
            ></wui-image>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="lg-regular" color="primary">${i.symbol}</wui-text>
            ${p?(0,a.qy)`<wui-text variant="sm-regular" color="secondary">
                  ${d.round(6).toString()} ${i.symbol}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>

        ${l===u?(0,a.qy)`<wui-icon name="checkmark" size="md" color="success"></wui-icon>`:null}
      </wui-flex>
    `}handleOptionsListScroll(){let e=this.shadowRoot?.querySelector(".pay-options-container");e&&(e.scrollHeight>300?(e.style.setProperty("--options-mask-image",`linear-gradient(
          to bottom,
          rgba(0, 0, 0, calc(1 - var(--options-scroll--top-opacity))) 0px,
          rgba(200, 200, 200, calc(1 - var(--options-scroll--top-opacity))) 1px,
          black 50px,
          black calc(100% - 50px),
          rgba(155, 155, 155, calc(1 - var(--options-scroll--bottom-opacity))) calc(100% - 1px),
          rgba(0, 0, 0, calc(1 - var(--options-scroll--bottom-opacity))) 100%
        )`),e.style.setProperty("--options-scroll--top-opacity",_.z8.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--options-scroll--bottom-opacity",_.z8.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--options-mask-image","none"),e.style.setProperty("--options-scroll--top-opacity","0"),e.style.setProperty("--options-scroll--bottom-opacity","0")))}};tx.styles=[tv],tk([(0,r.MZ)({type:Array})],tx.prototype,"options",void 0),tk([(0,r.MZ)()],tx.prototype,"selectedPaymentAsset",void 0),tk([(0,r.MZ)()],tx.prototype,"onSelect",void 0),tx=tk([(0,_.EM)("w3m-pay-options")],tx);let tT=(0,_.AH)`
  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[5]};
    border-top-left-radius: ${({borderRadius:e})=>e[5]};
  }

  .pay-options-container {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding: ${({spacing:e})=>e[1]};
  }

  w3m-tooltip-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  w3m-pay-options.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;var tA=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tS={eip155:"ethereum",solana:"solana",bip122:"bitcoin",ton:"ton"},tI={eip155:{icon:tS.eip155,label:"EVM"},solana:{icon:tS.solana,label:"Solana"},bip122:{icon:tS.bip122,label:"Bitcoin"},ton:{icon:tS.ton,label:"Ton"}},tE=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.profileName=null,this.paymentAsset=e3.state.paymentAsset,this.namespace=void 0,this.caipAddress=void 0,this.amount=e3.state.amount,this.recipient=e3.state.recipient,this.activeConnectorIds=l.a.state.activeConnectorIds,this.selectedPaymentAsset=e3.state.selectedPaymentAsset,this.selectedExchange=e3.state.selectedExchange,this.isFetchingQuote=e3.state.isFetchingQuote,this.quoteError=e3.state.quoteError,this.quote=e3.state.quote,this.isFetchingTokenBalances=e3.state.isFetchingTokenBalances,this.tokenBalances=e3.state.tokenBalances,this.isPaymentInProgress=e3.state.isPaymentInProgress,this.exchangeUrlForQuote=e3.state.exchangeUrlForQuote,this.completedTransactionsCount=0,this.unsubscribe.push(e3.subscribeKey("paymentAsset",e=>this.paymentAsset=e)),this.unsubscribe.push(e3.subscribeKey("tokenBalances",e=>this.onTokenBalancesChanged(e))),this.unsubscribe.push(e3.subscribeKey("isFetchingTokenBalances",e=>this.isFetchingTokenBalances=e)),this.unsubscribe.push(l.a.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(e3.subscribeKey("selectedPaymentAsset",e=>this.selectedPaymentAsset=e)),this.unsubscribe.push(e3.subscribeKey("isFetchingQuote",e=>this.isFetchingQuote=e)),this.unsubscribe.push(e3.subscribeKey("quoteError",e=>this.quoteError=e)),this.unsubscribe.push(e3.subscribeKey("quote",e=>this.quote=e)),this.unsubscribe.push(e3.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(e3.subscribeKey("recipient",e=>this.recipient=e)),this.unsubscribe.push(e3.subscribeKey("isPaymentInProgress",e=>this.isPaymentInProgress=e)),this.unsubscribe.push(e3.subscribeKey("selectedExchange",e=>this.selectedExchange=e)),this.unsubscribe.push(e3.subscribeKey("exchangeUrlForQuote",e=>this.exchangeUrlForQuote=e)),this.resetQuoteState(),this.initializeNamespace(),this.fetchTokens()}disconnectedCallback(){super.disconnectedCallback(),this.resetAssetsState(),this.unsubscribe.forEach(e=>e())}updated(e){super.updated(e),e.has("selectedPaymentAsset")&&this.fetchQuote()}render(){return(0,a.qy)`
      <wui-flex flexDirection="column">
        ${this.profileTemplate()}

        <wui-flex
          flexDirection="column"
          gap="4"
          class="payment-methods-container"
          .padding=${["4","4","5","4"]}
        >
          ${this.paymentOptionsViewTemplate()} ${this.amountWithFeeTemplate()}

          <wui-flex
            alignItems="center"
            justifyContent="space-between"
            .padding=${["1","0","1","0"]}
          >
            <wui-separator></wui-separator>
          </wui-flex>

          ${this.paymentActionsTemplate()}
        </wui-flex>
      </wui-flex>
    `}profileTemplate(){if(this.selectedExchange){let e=b.S.formatNumber(this.quote?.origin.amount,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return(0,a.qy)`
        <wui-flex
          .padding=${["4","3","4","3"]}
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-text variant="lg-regular" color="secondary">Paying with</wui-text>

          ${this.quote?(0,a.qy)`<wui-text variant="lg-regular" color="primary">
                ${b.S.bigNumber(e,{safe:!0}).round(6).toString()}
                ${this.quote.origin.currency.metadata.symbol}
              </wui-text>`:(0,a.qy)`<wui-shimmer width="80px" height="18px" variant="light"></wui-shimmer>`}
        </wui-flex>
      `}let e=S.w.getPlainAddress(this.caipAddress)??"",{name:t,image:i}=this.getWalletProperties({namespace:this.namespace}),{icon:r,label:n}=tI[this.namespace]??{};return(0,a.qy)`
      <wui-flex
        .padding=${["4","3","4","3"]}
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <wui-wallet-switch
          profileName=${(0,o.J)(this.profileName)}
          address=${(0,o.J)(e)}
          imageSrc=${(0,o.J)(i)}
          alt=${(0,o.J)(t)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        <wui-wallet-switch
          profileName=${(0,o.J)(n)}
          address=${(0,o.J)(e)}
          icon=${(0,o.J)(r)}
          iconSize="xs"
          .enableGreenCircle=${!1}
          alt=${(0,o.J)(n)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
      </wui-flex>
    `}initializeNamespace(){let e=c.W.state.activeChain;this.namespace=e,this.caipAddress=c.W.getAccountData(e)?.caipAddress,this.profileName=c.W.getAccountData(e)?.profileName??null,this.unsubscribe.push(c.W.subscribeChainProp("accountState",e=>this.onAccountStateChanged(e),e))}async fetchTokens(){if(this.namespace){let e;if(this.caipAddress){let{chainId:t,chainNamespace:i}=ev.C.parseCaipAddress(this.caipAddress),a=`${i}:${t}`;e=c.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===a)}await e3.fetchTokens({caipAddress:this.caipAddress,caipNetwork:e,namespace:this.namespace})}}fetchQuote(){if(this.amount&&this.recipient&&this.selectedPaymentAsset&&this.paymentAsset){let{address:e}=this.caipAddress?ev.C.parseCaipAddress(this.caipAddress):{};e3.fetchQuote({amount:this.amount.toString(),address:e,sourceToken:this.selectedPaymentAsset,toToken:this.paymentAsset,recipient:this.recipient})}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};let t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};let i=l.a.getConnector({id:t,namespace:e});if(!i)return{name:void 0,image:void 0};let a=K.$.getConnectorImage(i);return{name:i.name,image:a}}paymentOptionsViewTemplate(){return(0,a.qy)`
      <wui-flex flexDirection="column" gap="2">
        <wui-text variant="sm-regular" color="secondary">CHOOSE PAYMENT OPTION</wui-text>
        <wui-flex class="pay-options-container">${this.paymentOptionsTemplate()}</wui-flex>
      </wui-flex>
    `}paymentOptionsTemplate(){let e=this.getPaymentAssetFromTokenBalances();if(this.isFetchingTokenBalances)return(0,a.qy)`<w3m-pay-options-skeleton></w3m-pay-options-skeleton>`;if(0===e.length)return(0,a.qy)`<w3m-pay-options-empty
        @connectOtherWallet=${this.onConnectOtherWallet.bind(this)}
      ></w3m-pay-options-empty>`;let t={disabled:this.isFetchingQuote};return(0,a.qy)`<w3m-pay-options
      class=${(0,e4.H)(t)}
      .options=${e}
      .selectedPaymentAsset=${(0,o.J)(this.selectedPaymentAsset)}
      .onSelect=${this.onSelectedPaymentAssetChanged.bind(this)}
    ></w3m-pay-options>`}amountWithFeeTemplate(){return this.isFetchingQuote||!this.selectedPaymentAsset||this.quoteError?(0,a.qy)`<w3m-pay-fees-skeleton></w3m-pay-fees-skeleton>`:(0,a.qy)`<w3m-pay-fees></w3m-pay-fees>`}paymentActionsTemplate(){let e=this.isFetchingQuote||this.isFetchingTokenBalances,t=this.isFetchingQuote||this.isFetchingTokenBalances||!this.selectedPaymentAsset||!!this.quoteError,i=b.S.formatNumber(this.quote?.origin.amount??0,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return this.selectedExchange?e||t?(0,a.qy)`
          <wui-shimmer width="100%" height="48px" variant="light" ?rounded=${!0}></wui-shimmer>
        `:(0,a.qy)`<wui-button
        size="lg"
        fullWidth
        variant="accent-secondary"
        @click=${this.onPayWithExchange.bind(this)}
      >
        ${`Continue in ${this.selectedExchange.name}`}

        <wui-icon name="arrowRight" color="inherit" size="sm" slot="iconRight"></wui-icon>
      </wui-button>`:(0,a.qy)`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="md-regular" color="secondary">Order Total</wui-text>

          ${e||t?(0,a.qy)`<wui-shimmer width="58px" height="32px" variant="light"></wui-shimmer>`:(0,a.qy)`<wui-flex alignItems="center" gap="01">
                <wui-text variant="h4-regular" color="primary">${eY(i)}</wui-text>

                <wui-text variant="lg-regular" color="secondary">
                  ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
                </wui-text>
              </wui-flex>`}
        </wui-flex>

        ${this.actionButtonTemplate({isLoading:e,isDisabled:t})}
      </wui-flex>
    `}actionButtonTemplate(e){let t=eq(this.quote),{isLoading:i,isDisabled:r}=e,o="Pay";return t.length>1&&0===this.completedTransactionsCount&&(o="Approve"),(0,a.qy)`
      <wui-button
        size="lg"
        variant="accent-primary"
        ?loading=${i||this.isPaymentInProgress}
        ?disabled=${r||this.isPaymentInProgress}
        @click=${()=>{t.length>0?this.onSendTransactions():this.onTransfer()}}
      >
        ${o}
        ${i?null:(0,a.qy)`<wui-icon
              name="arrowRight"
              color="inherit"
              size="sm"
              slot="iconRight"
            ></wui-icon>`}
      </wui-button>
    `}getPaymentAssetFromTokenBalances(){return this.namespace?(this.tokenBalances[this.namespace]??[]).map(e=>{try{let t=c.W.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===e.chainId),i=e.address;if(!t)throw Error(`Target network not found for balance chainId "${e.chainId}"`);if(ek.y.isLowerCaseMatch(e.symbol,t.nativeCurrency.symbol))i="native";else if(S.w.isCaipAddress(i)){let{address:e}=ev.C.parseCaipAddress(i);i=e}else if(!i)throw Error(`Balance address not found for balance symbol "${e.symbol}"`);return{network:t.caipNetworkId,asset:i,metadata:{name:e.name,symbol:e.symbol,decimals:Number(e.quantity.decimals),logoURI:e.iconUrl},amount:e.quantity.numeric}}catch(e){return null}}).filter(e=>!!e).filter(e=>{let{chainId:t}=ev.C.parseCaipNetworkId(e.network),{chainId:i}=ev.C.parseCaipNetworkId(this.paymentAsset.network);return!!ek.y.isLowerCaseMatch(e.asset,this.paymentAsset.asset)||!this.selectedExchange||!ek.y.isLowerCaseMatch(t.toString(),i.toString())}):[]}onTokenBalancesChanged(e){this.tokenBalances=e;let[t]=this.getPaymentAssetFromTokenBalances();t&&e3.setSelectedPaymentAsset(t)}async onConnectOtherWallet(){await l.a.connect(),await s.W.open({view:"PayQuote"})}onAccountStateChanged(e){let{address:t}=this.caipAddress?ev.C.parseCaipAddress(this.caipAddress):{};if(this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null,t){let{address:e}=this.caipAddress?ev.C.parseCaipAddress(this.caipAddress):{};e?ek.y.isLowerCaseMatch(e,t)||(this.resetAssetsState(),this.resetQuoteState(),this.fetchTokens()):s.W.close()}}onSelectedPaymentAssetChanged(e){this.isFetchingQuote||e3.setSelectedPaymentAsset(e)}async onTransfer(){let e=eO(this.quote);if(e){if(!ek.y.isLowerCaseMatch(this.selectedPaymentAsset?.asset,e.deposit.currency))throw Error("Quote asset is not the same as the selected payment asset");let t=this.selectedPaymentAsset?.amount??"0",i=b.S.formatNumber(e.deposit.amount,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!b.S.bigNumber(t).gte(i))return void g.P.showError("Insufficient funds");if(this.quote&&this.selectedPaymentAsset&&this.caipAddress&&this.namespace){let{address:t}=ev.C.parseCaipAddress(this.caipAddress);await e3.onTransfer({chainNamespace:this.namespace,fromAddress:t,toAddress:e.deposit.receiver,amount:i,paymentAsset:this.selectedPaymentAsset}),e3.setRequestId(e.requestId),d.I.push("PayLoading")}}}async onSendTransactions(){let e=this.selectedPaymentAsset?.amount??"0",t=b.S.formatNumber(this.quote?.origin.amount??0,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!b.S.bigNumber(e).gte(t))return void g.P.showError("Insufficient funds");let i=eq(this.quote),[a]=eq(this.quote,this.completedTransactionsCount);a&&this.namespace&&(await e3.onSendTransaction({namespace:this.namespace,transactionStep:a}),this.completedTransactionsCount+=1,this.completedTransactionsCount===i.length&&(e3.setRequestId(a.requestId),d.I.push("PayLoading")))}onPayWithExchange(){if(this.exchangeUrlForQuote){let e=S.w.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!e)throw Error("Could not create popup window");e.location.href=this.exchangeUrlForQuote;let t=eO(this.quote);t&&e3.setRequestId(t.requestId),e3.initiatePayment(),d.I.push("PayLoading")}}resetAssetsState(){e3.setSelectedPaymentAsset(null)}resetQuoteState(){e3.resetQuoteState()}};tE.styles=tT,tA([(0,r.wk)()],tE.prototype,"profileName",void 0),tA([(0,r.wk)()],tE.prototype,"paymentAsset",void 0),tA([(0,r.wk)()],tE.prototype,"namespace",void 0),tA([(0,r.wk)()],tE.prototype,"caipAddress",void 0),tA([(0,r.wk)()],tE.prototype,"amount",void 0),tA([(0,r.wk)()],tE.prototype,"recipient",void 0),tA([(0,r.wk)()],tE.prototype,"activeConnectorIds",void 0),tA([(0,r.wk)()],tE.prototype,"selectedPaymentAsset",void 0),tA([(0,r.wk)()],tE.prototype,"selectedExchange",void 0),tA([(0,r.wk)()],tE.prototype,"isFetchingQuote",void 0),tA([(0,r.wk)()],tE.prototype,"quoteError",void 0),tA([(0,r.wk)()],tE.prototype,"quote",void 0),tA([(0,r.wk)()],tE.prototype,"isFetchingTokenBalances",void 0),tA([(0,r.wk)()],tE.prototype,"tokenBalances",void 0),tA([(0,r.wk)()],tE.prototype,"isPaymentInProgress",void 0),tA([(0,r.wk)()],tE.prototype,"exchangeUrlForQuote",void 0),tA([(0,r.wk)()],tE.prototype,"completedTransactionsCount",void 0),tE=tA([(0,_.EM)("w3m-pay-quote-view")],tE);let tP=(0,_.AH)`
  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  .transfers-badge {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }
`;var tC=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let t$=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.paymentAsset=e3.state.paymentAsset,this.amount=e3.state.amount,this.unsubscribe.push(e3.subscribeKey("paymentAsset",e=>{this.paymentAsset=e}),e3.subscribeKey("amount",e=>{this.amount=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=c.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return(0,a.qy)`<wui-flex
      alignItems="center"
      gap="1"
      .padding=${["1","2","1","1"]}
      class="transfers-badge"
    >
      <wui-image src=${(0,o.J)(this.paymentAsset.metadata.logoURI)} size="xl"></wui-image>
      <wui-text variant="lg-regular" color="primary">
        ${this.amount} ${this.paymentAsset.metadata.symbol}
      </wui-text>
      <wui-text variant="sm-regular" color="secondary">
        on ${e?.name??"Unknown"}
      </wui-text>
    </wui-flex>`}};t$.styles=[tP],tC([(0,r.MZ)()],t$.prototype,"paymentAsset",void 0),tC([(0,r.MZ)()],t$.prototype,"amount",void 0),t$=tC([(0,_.EM)("w3m-pay-header")],t$);let tN=(0,_.AH)`
  :host {
    height: 60px;
  }

  :host > wui-flex {
    box-sizing: border-box;
    background-color: var(--local-header-background-color);
  }

  wui-text {
    background-color: var(--local-header-background-color);
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-down-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards ${({easings:e})=>e["ease-out-power-2"]},
      slide-up-in 120ms forwards ${({easings:e})=>e["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-icon-button[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var tR=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tO=["SmartSessionList"],tq={PayWithExchange:_.f.tokens.theme.foregroundPrimary};function tW(){let e=d.I.state.data?.connector?.name,t=d.I.state.data?.wallet?.name,i=d.I.state.data?.network?.name,a=t??e,r=l.a.getConnectors(),o=1===r.length&&r[0]?.id==="w3m-email",n=c.W.getAccountData()?.socialProvider;return{Connect:`Connect ${o?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",UsageExceeded:"Usage Exceeded",ConnectingExternal:a??"Connect Wallet",ConnectingWalletConnect:a??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview Convert",Downloads:a?`Get ${a}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a Wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:i??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade Your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose Name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select Token",SwapPreview:"Preview Swap",WalletSend:"Send",WalletSendPreview:"Review Send",WalletSendSelectToken:"Select Token",WalletSendConfirmed:"Confirmed",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a Wallet?",ConnectWallets:"Connect Wallet",ConnectSocials:"All Socials",ConnectingSocial:n?n.charAt(0).toUpperCase()+n.slice(1):"Connect Social",ConnectingMultiChain:"Select Chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch Chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Processing payment...",PayQuote:"Payment Quote",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund Wallet",PayWithExchange:"Deposit from Exchange",PayWithExchangeSelectAsset:"Select Asset",SmartAccountSettings:"Smart Account Settings"}}let t_=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.heading=tW()[d.I.state.view],this.network=c.W.state.activeCaipNetwork,this.networkImage=K.$.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=d.I.state.view,this.viewDirection="",this.unsubscribe.push(Q.j.subscribeNetworkImages(()=>{this.networkImage=K.$.getNetworkImage(this.network)}),d.I.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.heading=tW()[e]},es.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),c.W.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=K.$.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){let e=tq[d.I.state.view]??_.f.tokens.theme.backgroundPrimary;return this.style.setProperty("--local-header-background-color",e),(0,a.qy)`
      <wui-flex
        .padding=${["0","4","0","4"]}
        justifyContent="space-between"
        alignItems="center"
      >
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){N.E.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),d.I.push("WhatIsAWallet")}async onClose(){await m.safeClose()}rightHeaderTemplate(){let e=n.H?.state?.features?.smartSessions;return"Account"===d.I.state.view&&e?(0,a.qy)`<wui-flex>
      <wui-icon-button
        icon="clock"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${()=>d.I.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-button>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return(0,a.qy)`
      <wui-icon-button
        icon="close"
        size="lg"
        type="neutral"
        variant="primary"
        iconSize="lg"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-button>
    `}titleTemplate(){if("PayQuote"===this.view)return(0,a.qy)`<w3m-pay-header></w3m-pay-header>`;let e=tO.includes(this.view);return(0,a.qy)`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="2"
      >
        <wui-text
          display="inline"
          variant="lg-regular"
          color="primary"
          data-testid="w3m-header-text"
        >
          ${this.heading}
        </wui-text>
        ${e?(0,a.qy)`<wui-tag variant="accent" size="md">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){let{view:e}=d.I.state,t="Connect"===e,i=n.H.state.enableEmbedded,r=n.H.state.enableNetworkSwitch;return"Account"===e&&r?(0,a.qy)`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,o.J)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,o.J)(this.networkImage)}
      ></wui-select>`:this.showBack&&!("ApproveTransaction"===e||"ConnectingSiwe"===e||t&&i)?(0,a.qy)`<wui-icon-button
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-button>`:(0,a.qy)`<wui-icon-button
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      size="lg"
      iconSize="lg"
      type="neutral"
      variant="primary"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-button>`}onNetworks(){this.isAllowedNetworkSwitch()&&(N.E.sendEvent({type:"track",event:"CLICK_NETWORKS"}),d.I.push("Networks"))}isAllowedNetworkSwitch(){let e=c.W.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,i=e?.find(({id:e})=>e===this.network?.id);return t||!i}onViewChange(){let{history:e}=d.I.state,t=es.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=es.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){let{history:e}=d.I.state,t=this.shadowRoot?.querySelector("#dynamic");e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){d.I.goBack()}};t_.styles=tN,tR([(0,r.wk)()],t_.prototype,"heading",void 0),tR([(0,r.wk)()],t_.prototype,"network",void 0),tR([(0,r.wk)()],t_.prototype,"networkImage",void 0),tR([(0,r.wk)()],t_.prototype,"showBack",void 0),tR([(0,r.wk)()],t_.prototype,"prevHistoryLength",void 0),tR([(0,r.wk)()],t_.prototype,"view",void 0),tR([(0,r.wk)()],t_.prototype,"viewDirection",void 0),t_=tR([(0,_.EM)("w3m-header")],t_),i(21129),i(84042);let tU=(0,M.AH)`
  :host {
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e[1]};
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[3]}
      ${({spacing:e})=>e[2]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[20]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    box-shadow:
      0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${({tokens:e})=>e.theme.borderPrimary};
    max-width: 320px;
  }

  wui-icon-box {
    border-radius: ${({borderRadius:e})=>e.round} !important;
    overflow: hidden;
  }

  wui-loading-spinner {
    padding: ${({spacing:e})=>e[1]};
    background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    border-radius: ${({borderRadius:e})=>e.round} !important;
  }
`;var tD=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tM=class extends a.WF{constructor(){super(...arguments),this.message="",this.variant="success"}render(){return(0,a.qy)`
      ${this.templateIcon()}
      <wui-text variant="lg-regular" color="primary" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return"loading"===this.variant?(0,a.qy)`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:(0,a.qy)`<wui-icon-box
      size="md"
      color=${({success:"success",error:"error",warning:"warning",info:"default"})[this.variant]}
      icon=${({success:"checkmark",error:"warning",warning:"warningCircle",info:"info"})[this.variant]}
    ></wui-icon-box>`}};tM.styles=[U.W5,tU],tD([(0,r.MZ)()],tM.prototype,"message",void 0),tD([(0,r.MZ)()],tM.prototype,"variant",void 0),tM=tD([(0,D.E)("wui-snackbar")],tM);let tL=(0,a.AH)`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var tF=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tz=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=g.P.state.open,this.unsubscribe.push(g.P.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){let{message:e,variant:t}=g.P.state;return(0,a.qy)` <wui-snackbar message=${e} variant=${t}></wui-snackbar> `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),g.P.state.autoClose&&(this.timeout=setTimeout(()=>g.P.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};tz.styles=tL,tF([(0,r.wk)()],tz.prototype,"open",void 0),tz=tF([(0,_.EM)("w3m-snackbar")],tz);let tB=(0,y.BX)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),tj=(0,P.X)({state:tB,subscribe:e=>(0,y.B1)(tB,()=>e(tB)),subscribeKey:(e,t)=>(0,f.u$)(tB,e,t),showTooltip({message:e,triggerRect:t,variant:i}){tB.open=!0,tB.message=e,tB.triggerRect=t,tB.variant=i},hide(){tB.open=!1,tB.message="",tB.triggerRect={width:0,height:0,top:0,left:0}}}),tH=(0,a.AH)`
  :host {
    width: 100%;
    display: block;
  }
`;var tV=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tG=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.text="",this.open=tj.state.open,this.unsubscribe.push(d.I.subscribeKey("view",()=>{tj.hide()}),s.W.subscribeKey("open",e=>{e||tj.hide()}),tj.subscribeKey("open",e=>{this.open=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),tj.hide()}render(){return(0,a.qy)`
      <div
        @pointermove=${this.onMouseEnter.bind(this)}
        @pointerleave=${this.onMouseLeave.bind(this)}
      >
        ${this.renderChildren()}
      </div>
    `}renderChildren(){return(0,a.qy)`<slot></slot> `}onMouseEnter(){let e=this.getBoundingClientRect();if(!this.open){let t=document.querySelector("w3m-modal"),i={width:e.width,height:e.height,left:e.left,top:e.top};if(t){let a=t.getBoundingClientRect();i.left=e.left-(window.innerWidth-a.width)/2,i.top=e.top-(window.innerHeight-a.height)/2}tj.showTooltip({message:this.text,triggerRect:i,variant:"shade"})}}onMouseLeave(e){this.contains(e.relatedTarget)||tj.hide()}};tG.styles=[tH],tV([(0,r.MZ)()],tG.prototype,"text",void 0),tV([(0,r.wk)()],tG.prototype,"open",void 0),tG=tV([(0,_.EM)("w3m-tooltip-trigger")],tG);let tZ=(0,_.AH)`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:e})=>e["3"]} 10px ${({spacing:e})=>e["3"]};
    border-radius: ${({borderRadius:e})=>e["3"]};
    color: ${({tokens:e})=>e.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:e})=>e["5"]});
    transition: opacity ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:e})=>e.xl};
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var tY=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let tK=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.open=tj.state.open,this.message=tj.state.message,this.triggerRect=tj.state.triggerRect,this.variant=tj.state.variant,this.unsubscribe.push(tj.subscribe(e=>{this.open=e.open,this.message=e.message,this.triggerRect=e.triggerRect,this.variant=e.variant}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){this.dataset.variant=this.variant;let e=this.triggerRect.top,t=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${e}px;
    --w3m-tooltip-left: ${t}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${+!!this.open};
    `,(0,a.qy)`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};tK.styles=[tZ],tY([(0,r.wk)()],tK.prototype,"open",void 0),tY([(0,r.wk)()],tK.prototype,"message",void 0),tY([(0,r.wk)()],tK.prototype,"triggerRect",void 0),tY([(0,r.wk)()],tK.prototype,"variant",void 0),tK=tY([(0,_.EM)("w3m-tooltip")],tK);let tQ={getTabsByNamespace:e=>e&&e===v.o.CHAIN.EVM?n.H.state.remoteFeatures?.activity===!1?es.ACCOUNT_TABS.filter(e=>"Activity"!==e.label):es.ACCOUNT_TABS:[],isValidReownName:e=>/^[a-zA-Z0-9]+$/gu.test(e),isValidEmail:e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/gu.test(e),validateReownName:e=>e.replace(/\^/gu,"").toLowerCase().replace(/[^a-zA-Z0-9]/gu,""),hasFooter(){let e=d.I.state.view;if(es.VIEWS_WITH_LEGAL_FOOTER.includes(e)){let{termsConditionsUrl:e,privacyPolicyUrl:t}=n.H.state,i=n.H.state.features?.legalCheckbox;return(!!e||!!t)&&!i}return es.VIEWS_WITH_DEFAULT_FOOTER.includes(e)}};i(55877);let tJ=(0,_.AH)`
  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: ${({spacing:e})=>e["3"]};
  }

  a {
    text-decoration: none;
    color: ${({tokens:e})=>e.core.textAccentPrimary};
    font-weight: 500;
  }
`;var tX=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let t0=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=n.H.state.remoteFeatures,this.unsubscribe.push(n.H.subscribeKey("remoteFeatures",e=>this.remoteFeatures=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=n.H.state,i=n.H.state.features?.legalCheckbox;return(e||t)&&!i?(0,a.qy)`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["4","3","3","3"]} justifyContent="center">
          <wui-text color="secondary" variant="md-regular" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `:(0,a.qy)`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `}andTemplate(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=n.H.state;return e&&t?"and":""}termsTemplate(){let{termsConditionsUrl:e}=n.H.state;return e?(0,a.qy)`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`:null}privacyTemplate(){let{privacyPolicyUrl:e}=n.H.state;return e?(0,a.qy)`<a href=${e} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`:null}reownBrandingTemplate(e=!1){return this.remoteFeatures?.reownBranding?e?(0,a.qy)`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:(0,a.qy)`<wui-ux-by-reown></wui-ux-by-reown>`:null}};t0.styles=[tJ],tX([(0,r.wk)()],t0.prototype,"remoteFeatures",void 0),t0=tX([(0,_.EM)("w3m-legal-footer")],t0),i(48352);let t3=(0,a.AH)``,t1=class extends a.WF{render(){let{termsConditionsUrl:e,privacyPolicyUrl:t}=n.H.state;return e||t?(0,a.qy)`
      <wui-flex
        .padding=${["4","3","3","3"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
      >
        <wui-text color="secondary" variant="md-regular" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `:null}howDoesItWorkTemplate(){return(0,a.qy)` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){N.E.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:(0,T.lj)(c.W.state.activeChain)===k.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),d.I.push("WhatIsABuy")}};t1.styles=[t3],t1=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}([(0,_.EM)("w3m-onramp-providers-footer")],t1);let t2=(0,_.AH)`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`;var t5=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let t4=class extends a.WF{constructor(){super(...arguments),this.resizeObserver=void 0,this.unsubscribe=[],this.status="hide",this.view=d.I.state.view}firstUpdated(){this.status=tQ.hasFooter()?"show":"hide",this.unsubscribe.push(d.I.subscribeKey("view",e=>{this.view=e,this.status=tQ.hasFooter()?"show":"hide","hide"===this.status&&document.documentElement.style.setProperty("--apkt-footer-height","0px")})),this.resizeObserver=new ResizeObserver(e=>{for(let t of e)if(t.target===this.getWrapper()){let e=`${t.contentRect.height}px`;document.documentElement.style.setProperty("--apkt-footer-height",e)}}),this.resizeObserver.observe(this.getWrapper())}render(){return(0,a.qy)`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `}templatePageContainer(){return tQ.hasFooter()?(0,a.qy)` ${this.templateFooter()}`:null}templateFooter(){switch(this.view){case"Networks":return this.templateNetworksFooter();case"Connect":case"ConnectWallets":case"OnRampFiatSelect":case"OnRampTokenSelect":return(0,a.qy)`<w3m-legal-footer></w3m-legal-footer>`;case"OnRampProviders":return(0,a.qy)`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;default:return null}}templateNetworksFooter(){return(0,a.qy)` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`}onNetworkHelp(){N.E.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),d.I.push("WhatIsANetwork")}getWrapper(){return this.shadowRoot?.querySelector("div.container")}};t4.styles=[t2],t5([(0,r.wk)()],t4.prototype,"status",void 0),t5([(0,r.wk)()],t4.prototype,"view",void 0),t4=t5([(0,_.EM)("w3m-footer")],t4);let t6=(0,_.AH)`
  :host {
    display: block;
    width: inherit;
  }
`;var t8=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let t7=class extends a.WF{constructor(){super(),this.unsubscribe=[],this.viewState=d.I.state.view,this.history=d.I.state.history.join(","),this.unsubscribe.push(d.I.subscribeKey("view",()=>{this.history=d.I.state.history.join(","),document.documentElement.style.setProperty("--apkt-duration-dynamic","var(--apkt-durations-lg)")}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),document.documentElement.style.setProperty("--apkt-duration-dynamic","0s")}render(){return(0,a.qy)`${this.templatePageContainer()}`}templatePageContainer(){return(0,a.qy)`<w3m-router-container
      history=${this.history}
      .setView=${()=>{this.viewState=d.I.state.view}}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`}viewTemplate(e){switch(e){case"AccountSettings":return(0,a.qy)`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return(0,a.qy)`<w3m-account-view></w3m-account-view>`;case"AllWallets":return(0,a.qy)`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return(0,a.qy)`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return(0,a.qy)`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return(0,a.qy)`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return(0,a.qy)`<w3m-connect-view></w3m-connect-view>`;case"Create":return(0,a.qy)`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return(0,a.qy)`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return(0,a.qy)`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return(0,a.qy)`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return(0,a.qy)`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return(0,a.qy)`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return(0,a.qy)`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return(0,a.qy)`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"DataCapture":return(0,a.qy)`<w3m-data-capture-view></w3m-data-capture-view>`;case"DataCaptureOtpConfirm":return(0,a.qy)`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;case"Downloads":return(0,a.qy)`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return(0,a.qy)`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return(0,a.qy)`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return(0,a.qy)`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return(0,a.qy)`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return(0,a.qy)`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return(0,a.qy)`<w3m-network-switch-view></w3m-network-switch-view>`;case"ProfileWallets":return(0,a.qy)`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;case"Transactions":return(0,a.qy)`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return(0,a.qy)`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampTokenSelect":return(0,a.qy)`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return(0,a.qy)`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return(0,a.qy)`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return(0,a.qy)`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return(0,a.qy)`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return(0,a.qy)`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return(0,a.qy)`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return(0,a.qy)`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return(0,a.qy)`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return(0,a.qy)`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return(0,a.qy)`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return(0,a.qy)`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return(0,a.qy)`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WalletSendConfirmed":return(0,a.qy)`<w3m-send-confirmed-view></w3m-send-confirmed-view>`;case"WhatIsABuy":return(0,a.qy)`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return(0,a.qy)`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return(0,a.qy)`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return(0,a.qy)`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return(0,a.qy)`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return(0,a.qy)`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return(0,a.qy)`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return(0,a.qy)`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return(0,a.qy)`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return(0,a.qy)`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return(0,a.qy)`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return(0,a.qy)`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return(0,a.qy)`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return(0,a.qy)`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return(0,a.qy)`<w3m-pay-loading-view></w3m-pay-loading-view>`;case"PayQuote":return(0,a.qy)`<w3m-pay-quote-view></w3m-pay-quote-view>`;case"FundWallet":return(0,a.qy)`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;case"PayWithExchange":return(0,a.qy)`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;case"PayWithExchangeSelectAsset":return(0,a.qy)`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`;case"UsageExceeded":return(0,a.qy)`<w3m-usage-exceeded-view></w3m-usage-exceeded-view>`;case"SmartAccountSettings":return(0,a.qy)`<w3m-smart-account-settings-view></w3m-smart-account-settings-view>`}}};t7.styles=[t6],t8([(0,r.wk)()],t7.prototype,"viewState",void 0),t8([(0,r.wk)()],t7.prototype,"history",void 0),t7=t8([(0,_.EM)("w3m-router")],t7);let t9=(0,_.AH)`
  :host {
    z-index: ${({tokens:e})=>e.core.zIndex};
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: ${({tokens:e})=>e.theme.overlay};
    backdrop-filter: blur(0px);
    transition:
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      backdrop-filter ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
    backdrop-filter: blur(8px);
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--apkt-modal-width);
    width: 100%;
    position: relative;
    outline: none;
    transform: translateY(4px);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-radius ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-1"]};
    will-change: border-radius, background-color, transform, box-shadow;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    padding: var(--local-modal-padding);
    box-sizing: border-box;
  }

  :host(.open) wui-card {
    transform: translateY(0px);
  }

  wui-card::before {
    z-index: 1;
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    transition: box-shadow ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    transition-delay: ${({durations:e})=>e.md};
    will-change: box-shadow;
  }

  :host([data-mobile-fullscreen='true']) wui-card::before {
    border-radius: 0px;
  }

  :host([data-border='true']) wui-card::before {
    box-shadow: inset 0px 0px 0px 4px ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  :host([data-border='false']) wui-card::before {
    box-shadow: inset 0px 0px 0px 1px ${({tokens:e})=>e.theme.borderPrimaryDark};
  }

  :host([data-border='true']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-border var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  :host([data-border='false']) wui-card {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      card-background-default var(--apkt-duration-dynamic)
        ${({easings:e})=>e["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: 0s;
  }

  :host(.appkit-modal) wui-card {
    max-width: var(--apkt-modal-width);
  }

  wui-card[shake='true'] {
    animation:
      fade-in ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      w3m-shake ${({durations:e})=>e.xl}
        ${({easings:e})=>e["ease-out-power-2"]};
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--apkt-spacing-6) 0px;
    }
  }

  @media (max-width: 430px) {
    :host([data-mobile-fullscreen='true']) {
      height: 100dvh;
    }
    :host([data-mobile-fullscreen='true']) wui-flex {
      align-items: stretch;
    }
    :host([data-mobile-fullscreen='true']) wui-card {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }
    :host(:not([data-mobile-fullscreen='true'])) wui-flex {
      align-items: flex-end;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card {
      max-width: 100%;
      border-bottom: none;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card[data-embedded='true'] {
      border-bottom-left-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
      border-bottom-right-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card:not([data-embedded='true']) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    wui-card[shake='true'] {
      animation: w3m-shake 0.5s ${({easings:e})=>e["ease-out-power-2"]};
    }
  }

  @keyframes fade-in {
    0% {
      transform: scale(0.99) translateY(4px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes card-background-border {
    from {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
  }

  @keyframes card-background-default {
    from {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }
    to {
      background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    }
  }
`;var ie=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let it="scroll-lock",ii={PayWithExchange:"0",PayWithExchangeSelectAsset:"0",Pay:"0",PayQuote:"0",PayLoading:"0"};class ia extends a.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=n.H.state.enableEmbedded,this.open=s.W.state.open,this.caipAddress=c.W.state.activeCaipAddress,this.caipNetwork=c.W.state.activeCaipNetwork,this.shake=s.W.state.shake,this.filterByNamespace=l.a.state.filterByNamespace,this.padding=_.f.spacing[1],this.mobileFullScreen=n.H.state.enableMobileFullScreen,this.initializeTheming(),u.N.prefetchAnalyticsConfig(),this.unsubscribe.push(s.W.subscribeKey("open",e=>e?this.onOpen():this.onClose()),s.W.subscribeKey("shake",e=>this.shake=e),c.W.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),c.W.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),n.H.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),l.a.subscribeKey("filterByNamespace",e=>{this.filterByNamespace===e||c.W.getAccountData(e)?.caipAddress||(u.N.fetchRecommendedWallets(),this.filterByNamespace=e)}),d.I.subscribeKey("view",()=>{this.dataset.border=tQ.hasFooter()?"true":"false",this.padding=ii[d.I.state.view]??_.f.spacing[1]}))}firstUpdated(){if(this.dataset.border=tQ.hasFooter()?"true":"false",this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.caipAddress){if(this.enableEmbedded){s.W.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return(this.style.setProperty("--local-modal-padding",this.padding),this.enableEmbedded)?(0,a.qy)`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?(0,a.qy)`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return(0,a.qy)` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,o.J)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-footer></w3m-footer>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){e.target===e.currentTarget&&(this.mobileFullScreen||await this.handleClose())}async handleClose(){await m.safeClose()}initializeTheming(){let{themeVariables:e,themeMode:t}=w.W.state,i=_.Zv.getColorTheme(t);(0,_.RF)(e,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),g.P.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let e=document.createElement("style");e.dataset.w3m=it,e.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(e)}onScrollUnlock(){let e=document.head.querySelector(`style[data-w3m="${it}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){let{tagName:i}=t.target;!i||i.includes("W3M-")||i.includes("WUI-")||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){let t=c.W.state.isSwitchingNamespace,i="ProfileWallets"===d.I.state.view;e||t||i||s.W.close(),await h.U.initializeIfEnabled(e),this.caipAddress=e,c.W.setIsSwitchingNamespace(!1)}onNewNetwork(e){let t=this.caipNetwork,i=t?.caipNetworkId?.toString(),a=e?.caipNetworkId?.toString(),r="UnsupportedChain"===d.I.state.view,o=s.W.state.open,n=!1;this.enableEmbedded&&"SwitchNetwork"===d.I.state.view&&(n=!0),i!==a&&W.resetState(),o&&r&&(n=!0),n&&"SIWXSignMessage"!==d.I.state.view&&d.I.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(u.N.prefetch(),u.N.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}ia.styles=t9,ie([(0,r.MZ)({type:Boolean})],ia.prototype,"enableEmbedded",void 0),ie([(0,r.wk)()],ia.prototype,"open",void 0),ie([(0,r.wk)()],ia.prototype,"caipAddress",void 0),ie([(0,r.wk)()],ia.prototype,"caipNetwork",void 0),ie([(0,r.wk)()],ia.prototype,"shake",void 0),ie([(0,r.wk)()],ia.prototype,"filterByNamespace",void 0),ie([(0,r.wk)()],ia.prototype,"padding",void 0),ie([(0,r.wk)()],ia.prototype,"mobileFullScreen",void 0);let ir=class extends ia{};ir=ie([(0,_.EM)("w3m-modal")],ir);let io=class extends ia{};io=ie([(0,_.EM)("appkit-modal")],io);let is=(0,_.AH)`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: ${({borderRadius:e})=>e[5]};
    background-color: ${({colors:e})=>e.semanticError010};
  }
`,ic=class extends a.WF{constructor(){super()}render(){return(0,a.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1","3","4","3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="error" name="warningCircle"></wui-icon>
        </wui-flex>

        <wui-text variant="lg-medium" color="primary" align="center">
          The app isn't responding as expected
        </wui-text>
        <wui-text variant="md-regular" color="secondary" align="center">
          Try again or reach out to the app team for help.
        </wui-text>

        <wui-button
          variant="neutral-secondary"
          size="md"
          @click=${this.onTryAgainClick.bind(this)}
          data-testid="w3m-usage-exceeded-button"
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try Again
        </wui-button>
      </wui-flex>
    `}onTryAgainClick(){d.I.goBack()}};ic.styles=is,ic=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}([(0,_.EM)("w3m-usage-exceeded-view")],ic);var il=i(74548);i(78790);let iu=(0,_.AH)`
  :host {
    width: 100%;
  }
`;var id=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let ip=class extends a.WF{constructor(){super(...arguments),this.hasImpressionSent=!1,this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100",this.rdnsId="",this.displayIndex=void 0,this.walletRank=void 0,this.namespaces=[]}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupIntersectionObserver()}updated(e){super.updated(e),(e.has("name")||e.has("imageSrc")||e.has("walletRank"))&&(this.hasImpressionSent=!1),e.has("walletRank")&&this.walletRank&&!this.intersectionObserver&&this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(e=>{!e.isIntersecting||this.loading||this.hasImpressionSent||this.sendImpressionEvent()})},{threshold:.1}),this.intersectionObserver.observe(this)}cleanupIntersectionObserver(){this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=void 0)}sendImpressionEvent(){this.name&&!this.hasImpressionSent&&this.walletRank&&(this.hasImpressionSent=!0,(this.rdnsId||this.name)&&N.E.sendWalletImpressionEvent({name:this.name,walletRank:this.walletRank,rdnsId:this.rdnsId,view:d.I.state.view,displayIndex:this.displayIndex}))}handleGetWalletNamespaces(){return Object.keys(il.q.state.adapters).length>1?this.namespaces:[]}render(){return(0,a.qy)`
      <wui-list-wallet
        .walletImages=${this.walletImages}
        imageSrc=${(0,o.J)(this.imageSrc)}
        name=${this.name}
        size=${(0,o.J)(this.size)}
        tagLabel=${(0,o.J)(this.tagLabel)}
        .tagVariant=${this.tagVariant}
        .walletIcon=${this.walletIcon}
        .tabIdx=${this.tabIdx}
        .disabled=${this.disabled}
        .showAllWallets=${this.showAllWallets}
        .loading=${this.loading}
        loadingSpinnerColor=${this.loadingSpinnerColor}
        .namespaces=${this.handleGetWalletNamespaces()}
      ></wui-list-wallet>
    `}};ip.styles=iu,id([(0,r.MZ)({type:Array})],ip.prototype,"walletImages",void 0),id([(0,r.MZ)()],ip.prototype,"imageSrc",void 0),id([(0,r.MZ)()],ip.prototype,"name",void 0),id([(0,r.MZ)()],ip.prototype,"size",void 0),id([(0,r.MZ)()],ip.prototype,"tagLabel",void 0),id([(0,r.MZ)()],ip.prototype,"tagVariant",void 0),id([(0,r.MZ)()],ip.prototype,"walletIcon",void 0),id([(0,r.MZ)()],ip.prototype,"tabIdx",void 0),id([(0,r.MZ)({type:Boolean})],ip.prototype,"disabled",void 0),id([(0,r.MZ)({type:Boolean})],ip.prototype,"showAllWallets",void 0),id([(0,r.MZ)({type:Boolean})],ip.prototype,"loading",void 0),id([(0,r.MZ)({type:String})],ip.prototype,"loadingSpinnerColor",void 0),id([(0,r.MZ)()],ip.prototype,"rdnsId",void 0),id([(0,r.MZ)()],ip.prototype,"displayIndex",void 0),id([(0,r.MZ)()],ip.prototype,"walletRank",void 0),id([(0,r.MZ)({type:Array})],ip.prototype,"namespaces",void 0),ip=id([(0,_.EM)("w3m-list-wallet")],ip);let ih=(0,_.AH)`
  :host {
    --local-duration-height: 0s;
    --local-duration: ${({durations:e})=>e.lg};
    --local-transition: ${({easings:e})=>e["ease-out-power-2"]};
  }

  .container {
    display: block;
    overflow: hidden;
    overflow: hidden;
    position: relative;
    height: var(--local-container-height);
    transition: height var(--local-duration-height) var(--local-transition);
    will-change: height, padding-bottom;
  }

  .container[data-mobile-fullscreen='true'] {
    overflow: scroll;
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border-bottom-left-radius: var(--local-border-bottom-radius);
    border-bottom-right-radius: var(--local-border-bottom-radius);
    transition: border-bottom-left-radius var(--local-duration) var(--local-transition);
  }

  .page[data-mobile-fullscreen='true'] {
    height: 100%;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .footer {
    height: var(--apkt-footer-height);
  }

  div.page[view-direction^='prev-'] .page-content {
    animation:
      slide-left-out var(--local-duration) forwards var(--local-transition),
      slide-left-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  div.page[view-direction^='next-'] .page-content {
    animation:
      slide-right-out var(--local-duration) forwards var(--local-transition),
      slide-right-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:e})=>e.lg});
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;var im=function(e,t,i,a){var r,o=arguments.length,n=o<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,a);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(n=(o<3?r(n):o>3?r(t,i,n):r(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n};let iw=class extends a.WF{constructor(){super(...arguments),this.resizeObserver=void 0,this.transitionDuration="0.15s",this.transitionFunction="",this.history="",this.view="",this.setView=void 0,this.viewDirection="",this.historyState="",this.previousHeight="0px",this.mobileFullScreen=n.H.state.enableMobileFullScreen,this.onViewportResize=()=>{this.updateContainerHeight()}}updated(e){if(e.has("history")){let e=this.history;""!==this.historyState&&this.historyState!==e&&this.onViewChange(e)}e.has("transitionDuration")&&this.style.setProperty("--local-duration",this.transitionDuration),e.has("transitionFunction")&&this.style.setProperty("--local-transition",this.transitionFunction)}firstUpdated(){this.transitionFunction&&this.style.setProperty("--local-transition",this.transitionFunction),this.style.setProperty("--local-duration",this.transitionDuration),this.historyState=this.history,this.resizeObserver=new ResizeObserver(e=>{for(let t of e)if(t.target===this.getWrapper()){let e=t.contentRect.height,i=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");this.mobileFullScreen?(e=(window.visualViewport?.height||window.innerHeight)-this.getHeaderHeight()-i,this.style.setProperty("--local-border-bottom-radius","0px")):(e+=i,this.style.setProperty("--local-border-bottom-radius",i?"var(--apkt-borderRadius-5)":"0px")),this.style.setProperty("--local-container-height",`${e}px`),"0px"!==this.previousHeight&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${e}px`}}),this.resizeObserver.observe(this.getWrapper()),this.updateContainerHeight(),window.addEventListener("resize",this.onViewportResize),window.visualViewport?.addEventListener("resize",this.onViewportResize)}disconnectedCallback(){let e=this.getWrapper();e&&this.resizeObserver&&this.resizeObserver.unobserve(e),window.removeEventListener("resize",this.onViewportResize),window.visualViewport?.removeEventListener("resize",this.onViewportResize)}render(){return(0,a.qy)`
      <div class="container" data-mobile-fullscreen="${(0,o.J)(this.mobileFullScreen)}">
        <div
          class="page"
          data-mobile-fullscreen="${(0,o.J)(this.mobileFullScreen)}"
          view-direction="${this.viewDirection}"
        >
          <div class="page-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}onViewChange(e){let t=e.split(",").filter(Boolean),i=this.historyState.split(",").filter(Boolean),a=i.length,r=t.length,o=t[t.length-1]||"",n=_.Zv.cssDurationToNumber(this.transitionDuration),s="";r>a?s="next":r<a?s="prev":r===a&&t[r-1]!==i[a-1]&&(s="next"),this.viewDirection=`${s}-${o}`,setTimeout(()=>{this.historyState=e,this.setView?.(o)},n),setTimeout(()=>{this.viewDirection=""},2*n)}getWrapper(){return this.shadowRoot?.querySelector("div.page")}updateContainerHeight(){let e=this.getWrapper();if(!e)return;let t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0"),i=0;this.mobileFullScreen?(i=(window.visualViewport?.height||window.innerHeight)-this.getHeaderHeight()-t,this.style.setProperty("--local-border-bottom-radius","0px")):(i=e.getBoundingClientRect().height+t,this.style.setProperty("--local-border-bottom-radius",t?"var(--apkt-borderRadius-5)":"0px")),this.style.setProperty("--local-container-height",`${i}px`),"0px"!==this.previousHeight&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${i}px`}getHeaderHeight(){return 60}};iw.styles=[ih],im([(0,r.MZ)({type:String})],iw.prototype,"transitionDuration",void 0),im([(0,r.MZ)({type:String})],iw.prototype,"transitionFunction",void 0),im([(0,r.MZ)({type:String})],iw.prototype,"history",void 0),im([(0,r.MZ)({type:String})],iw.prototype,"view",void 0),im([(0,r.MZ)({attribute:!1})],iw.prototype,"setView",void 0),im([(0,r.wk)()],iw.prototype,"viewDirection",void 0),im([(0,r.wk)()],iw.prototype,"historyState",void 0),im([(0,r.wk)()],iw.prototype,"previousHeight",void 0),im([(0,r.wk)()],iw.prototype,"mobileFullScreen",void 0),iw=im([(0,_.EM)("w3m-router-container")],iw)}}]);