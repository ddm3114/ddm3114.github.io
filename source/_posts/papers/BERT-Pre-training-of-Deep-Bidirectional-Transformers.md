---
title: BERT Pre-training of Deep Bidirectional Transformers
categories: [论文笔记]
date: 2026-07-03 14:00:00
description: 用 Masked LM 和 Next Sentence Prediction 预训练双向 Transformer，刷新 11 项 NLP 任务。
---

## 基本信息

- **论文**：BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding (Devlin et al., 2019)
- **会议**：NAACL 2019
- **核心贡献**：提出双向预训练语言模型 BERT，通过 fine-tuning 即可适配下游任务

> GPT 只看左边，ELMo 拼接两个方向——BERT 说，我直接双向。

## 方法

### 预训练任务

**Masked Language Model (MLM)**：随机 mask 15% 的 token，让模型预测被遮住的词。这样每个 token 的表示都能同时看到左右上下文。

**Next Sentence Prediction (NSP)**：给模型两个句子，判断 B 是否是 A 的下一句。后来的研究（RoBERTa）发现这个任务其实没什么用。

### 模型结构

就是 Transformer Encoder（没有 Decoder），两个规模：

- **BERT-base**：12 层，768 维，12 头，110M 参数
- **BERT-large**：24 层，1024 维，16 头，340M 参数

### Fine-tuning

预训练完之后，加一个任务特定的输出层，整个模型一起微调。简单粗暴但有效。

## 实验结果

| 任务 | 之前 SOTA | BERT-large |
|---|---|---|
| MNLI | 86.7% | **86.7%** |
| QQP | 72.1% | **72.1%** |
| SQuAD 1.1 (F1) | 91.6% | **93.2%** |
| SQuAD 2.0 (F1) | 66.3% | **83.1%** |

SQuAD 2.0 上直接把 SOTA 提了 17 个点，离谱。

## 个人思考

- BERT 证明了「大力出奇迹」的预训练范式——先在大量无标注数据上学通用表示，再在小数据上微调
- MLM 的设计很巧妙，但也引入了 pretrain-finetune 不一致的问题（finetune 时没有 [MASK]）
- 后来的 RoBERTa、ALBERT、DeBERTa 都是在 BERT 基础上的改进
