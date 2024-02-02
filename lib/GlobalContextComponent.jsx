import { createContext } from "react";
import { useState } from "react";

const GlobalContext = createContext();

function GlobalContextComponent(props) {
    //
    let [asideActiveTab, setAsideActiveTab] = useState(-1);
    let [asideIsOpen, setAsideIsOpen] = useState(false);

    //
    let [cityData, setCityData] = useState([]);
    let [accountGroupData, setAccountGroupData] = useState([]);

    //
    let [ledgerMasterData, setLedgerMasterData] = useState([]);
    let [menuMasterData, setMenuMasterData] = useState([]);

    //
    let [typeMasterData, setTypeMasterData] = useState([]);
    let [typeNameMasterData, setTypeNameMasterData] = useState([]);
    let [companyMenuMasterData, setCompanyMenuMasterData] = useState([]);

    //
    let [itemMasterData, setItemMasterData] = useState([]);

    //
    let [purchaseMasterData, setPurchaseMasterData] = useState([]);
    let [purchaseDetailsData, setPurchaseDetailsData] = useState([]);

    //
    let [paymentReceiptMasterData, setPaymentReceiptMasterData] = useState([]);
    let [paymentReceiptDetailsData, setPaymentReceiptDetailsData] = useState([]);

    return (
        <GlobalContext.Provider
            value={{
                asideActiveTab,
                setAsideActiveTab,
                asideIsOpen,
                setAsideIsOpen,

                cityData,
                setCityData,
                accountGroupData,
                setAccountGroupData,

                ledgerMasterData,
                setLedgerMasterData,
                menuMasterData,
                setMenuMasterData,

                typeMasterData,
                setTypeMasterData,
                typeNameMasterData,
                setTypeNameMasterData,
                companyMenuMasterData,
                setCompanyMenuMasterData,

                itemMasterData,
                setItemMasterData,

                purchaseMasterData,
                setPurchaseMasterData,
                purchaseDetailsData,
                setPurchaseDetailsData,

                paymentReceiptMasterData,
                setPaymentReceiptMasterData,
                paymentReceiptDetailsData,
                setPaymentReceiptDetailsData,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
}

export { GlobalContext, GlobalContextComponent };
