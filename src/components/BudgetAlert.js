// src/components/BudgetAlert.js
import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { userSettingsStore } from '../stores/userSettingsStore';
import { transactionsStore } from '../stores/transactionStore';
import { Alert } from '@mui/material';
import { budgetAlertStore } from '../stores/budgetAlertStore';

const BudgetAlert = () => {
    const userSettings = useStore(userSettingsStore);
    const transactions = useStore(transactionsStore);

    // Calculate the total spend of all transactions
    const totalExpense = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    // Determine if the overall budget has been exceeded
    const budgetExceeded = totalExpense > userSettings.totalBudgetLimit;

    // Determine if any category limits have been exceeded
    const categoriesExceeded = transactions.reduce((acc, transaction) => {
        const categoryLimit = userSettings.categoryLimits[transaction.category] || Infinity;
        const categoryExpense = acc[transaction.category] || 0;
        acc[transaction.category] = categoryExpense + transaction.amount;

        return acc;
    }, {});

    const categoriesAlert = Object.entries(categoriesExceeded).some(
        ([category, expense]) => expense > (userSettings.categoryLimits[category] || Infinity)
    );

    useEffect(() => {
        if (budgetExceeded || categoriesAlert) {
            budgetAlertStore.set({
                isVisible: true,
                message: budgetExceeded
                    ? `You have exceeded your total budget of ${userSettings.totalBudgetLimit}.`
                    : `One or more categories have exceeded their budget limits.`,
            });
        } else {
            budgetAlertStore.set({ isVisible: false, message: '' });
        }
    }, [budgetExceeded, categoriesAlert, userSettings.totalBudgetLimit]);

    return (
        budgetAlertStore.get().isVisible && (
            <Alert severity="warning" sx={{ mb: 2 }}>
                {budgetAlertStore.get().message}
            </Alert>
        )
    );
};

export default BudgetAlert;
