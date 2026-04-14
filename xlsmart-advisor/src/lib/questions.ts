import type { Question } from './types';
import rawOptions from '../data/question-options.json';

interface QuestionsData {
  questions: Question[];
}

const data = rawOptions as QuestionsData;

export function getIndustryOptions() {
  return data.questions.find((q) => q.id === 'industry')?.options ?? [];
}

export function getCompanySizeOptions() {
  return data.questions.find((q) => q.id === 'company_size')?.options ?? [];
}

export function getPrimaryNeedOptions() {
  return data.questions.find((q) => q.id === 'primary_need')?.options ?? [];
}
