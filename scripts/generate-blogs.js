#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const postsDir = path.join(__dirname, '../content/posts');

const blogTopics = [
  {
    title: 'TB-500: Thymosin Beta 4 - The Ultimate Healing Peptide for Athletes',
    slug: 'tb-500-healing-peptide',
    keywords: ['TB-500', 'thymosin beta 4', 'healing', 'recovery', 'athletes']
  },
  {
    title: 'Sermorelin: Natural Growth Hormone Stimulation for Performance',
    slug: 'sermorelin-growth-hormone',
    keywords: ['sermorelin', 'growth hormone', 'natural', 'fitness', 'bodybuilding']
  },
  {
    title: 'AOD 9604: Fat-Loss Peptide Without Side Effects',
    slug: 'aod-9604-fat-loss',
    keywords: ['AOD 9604', 'fat loss', 'weight loss', 'metabolism', 'peptide']
  },
  {
    title: 'GHK-Cu: Copper Peptide for Anti-Aging and Skin Regeneration',
    slug: 'ghk-cu-anti-aging',
    keywords: ['GHK-Cu', 'copper peptide', 'anti-aging', 'collagen', 'skin']
  },
  {
    title: 'GHRP-6: Powerful Growth Hormone Release for Muscle Gains',
    slug: 'ghrp-6-muscle-growth',
    keywords: ['GHRP-6', 'growth hormone', 'muscle gain', 'strength', 'peptide']
  }
];

function generateBlog(topic) {
  const date = new Date().toISOString().split('T')[0];
  return `---
title: "${topic.title}"
description: "Comprehensive guide to ${topic.keywords[0]} peptide. Benefits, dosing, and results."
date: "${date}"
keywords: ["${topic.keywords.join('", "')}"]
---

## What is ${topic.keywords[0]}?

${topic.keywords[0]} is a powerful peptide gaining recognition in the fitness and wellness communities.

## Key Benefits

- Enhanced performance and recovery
- Accelerated results
- Improved overall health
- Better quality of life

## How to Use

**Standard dosage:**
- 250-500 mcg per injection
- 1-3 times daily
- 8-12 week cycles

## Results Timeline

- Week 2-3: Initial improvements
- Week 4-6: Noticeable changes
- Week 8-12: Significant results

## Why Choose ${topic.keywords[0]}?

This peptide is scientifically formulated for maximum effectiveness and safety. Athletes worldwide trust it for consistent results.

## Conclusion

Start your journey with ${topic.keywords[0]} today and experience transformation.
`;
}

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

const selected = blogTopics.sort(() => Math.random() - 0.5).slice(0, 2);

selected.forEach(topic => {
  const filePath = path.join(postsDir, `${topic.slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateBlog(topic));
    console.log(`Generated: ${topic.slug}`);
  }
});
