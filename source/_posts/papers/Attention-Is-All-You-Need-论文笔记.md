---
title: Attention Is All You Need 论文笔记
date: 2026-07-04 19:00:00
categories: [论文笔记]
description: Transformer 架构的开山之作，抛弃 RNN/CNN，纯注意力机制搞定序列建模。
---

## 基本信息

- **论文**：Attention Is All You Need (Vaswani et al., 2017)
- **会议**：NeurIPS 2017
- **核心贡献**：提出 Transformer 架构，完全基于 self-attention，不用 RNN 也不用 CNN

> 这篇论文改变了 NLP 的一切，也改变了后来 CV、语音、多模态的一切。

## 架构概览

![Transformer 架构图](transformer-arch.png)

Transformer 由 **Encoder** 和 **Decoder** 两部分组成，各堆叠 N 层（论文中 N=6）。

### Encoder

每层包含两个子层：

1. **Multi-Head Self-Attention** — 让每个 token 看到序列中所有其他 token
2. **Feed-Forward Network** — 两层全连接，中间 ReLU 激活

每个子层都有 **残差连接 + LayerNorm**：

```
output = LayerNorm(x + Sublayer(x))
```

### Decoder

比 Encoder 多一个子层：

1. **Masked Multi-Head Self-Attention** — 防止看到未来的 token
2. **Multi-Head Cross-Attention** — query 来自 decoder，key/value 来自 encoder 输出
3. **Feed-Forward Network**

## Self-Attention 机制

核心公式：

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

直觉：每个 token 对其他所有 token 算一个"相关度"分数，然后加权求和。

### 为什么除以 $\sqrt{d_k}$？

当 $d_k$ 很大时，$QK^T$ 的值会很大，softmax 会变得非常尖锐（趋近于 one-hot），梯度消失。除以 $\sqrt{d_k}$ 让方差稳定在 1。

### Multi-Head Attention

不是只算一次 attention，而是并行算 $h$ 次（论文中 $h=8$），每次用不同的线性投影：

```python
# 伪代码
heads = [attention(xW_q_i, xW_k_i, xW_v_i) for i in range(h)]
output = concat(heads) @ W_o
```

多头的好处：不同的 head 可以关注不同类型的关系（语法、语义、位置等）。

## Positional Encoding

Transformer 没有循环结构，天然不知道 token 的顺序。解决方案：给输入加上位置编码。

论文用的是正弦/余弦函数：

$$
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d}}\right)
$$

$$
PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d}}\right)
$$

好处是可以外推到训练时没见过的序列长度。

## 关键实验结果

| 模型 | BLEU (EN→DE) | BLEU (EN→FR) | 训练成本 |
|---|---|---|---|
| 之前 SOTA | 26.36 | 41.29 | — |
| Transformer (base) | 27.3 | 38.1 | 12h × 8 GPU |
| Transformer (big) | **28.4** | **41.8** | 3.5d × 8 GPU |

以更少的训练成本超越了所有之前的模型。

## 个人思考

- Attention 的本质就是**可学习的加权平均**，简单到优雅
- 抛弃 RNN 的关键好处不只是效果好，更是**可并行化**，这让大规模训练成为可能
- 后来的 BERT、GPT 系列都是 Transformer 的变体，这篇论文的影响怎么强调都不为过

---

*读完这篇再去看 BERT 和 GPT，会清晰很多。*
