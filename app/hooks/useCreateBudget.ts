"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SubCategory } from "app/types/category";
import { formatAmountInput, parseAmountInput } from "app/utilities/common/functions";
import { budgetApi } from "app/services/budgetApi";
import { extractErrorMessage } from "app/lib/apiClient";
import type { UseCreateBudgetProps, UseCreateBudgetResult } from "app/types/budgets";
import { useAuthContext } from "app/context/AuthContext";

export const useCreateBudget = ({ category, setCategory }: UseCreateBudgetProps): UseCreateBudgetResult => {
  const router = useRouter();
  const { user } = useAuthContext();

  const [amountValue, setAmountValue] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleBack = useCallback(() => {
    setCategory({} as SubCategory);
  }, [setCategory]);

  const handleAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formatted = formatAmountInput(inputValue);
    setAmountValue(formatted);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!category || !amountValue || !category.id) {
        return;
      }

      // Parse formatted amount back to number
      const budgetAmount = parseAmountInput(amountValue);

      if (budgetAmount <= 0) {
        setSubmitError("Vui lòng nhập số tiền hợp lệ.");
        return;
      }

      // Determine \"financial\" month in YYYY-MM based on user's startDayMonth (like budgets list).
      // Example: if startDayMonth = 10 and today is 9/03, period is 10/02–09/03 → monthString = 2026-02.
      const now = new Date();
      const startDay = user?.startDayMonth ?? 1;
      let periodYear = now.getFullYear();
      let periodMonth = now.getMonth(); // 0-11
      if (now.getDate() < startDay) {
        periodMonth -= 1;
        if (periodMonth < 0) {
          periodMonth = 11;
          periodYear -= 1;
        }
      }
      const monthNumber = periodMonth + 1;
      const monthString = `${periodYear}-${String(monthNumber).padStart(2, "0")}`;

      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      try {
        await budgetApi.createBudget({
          subCategoryId: category.id,
          budget: budgetAmount,
          month: monthString,
        });
        const params = new URLSearchParams();
        params.set("subCategoryId", category.id);

        setSubmitSuccess(true);
        // Navigate back after successful creation
        setTimeout(() => {
          router.push(`/transactions/category?${params.toString()}`);
        }, 1000);
      } catch (error) {
        const message = extractErrorMessage(error);
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [category, amountValue, router, user?.startDayMonth],
  );

  const isFormValid = Boolean(category && category.id && amountValue.trim().length > 0);

  return {
    amountValue,
    isFormValid,
    isSubmitting,
    submitError,
    submitSuccess,
    handleBack,
    handleAmountChange,
    handleSubmit,
  };
};
