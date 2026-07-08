import { OpenAIEmbeddings } from '@langchain/openai';

import type { EmbeddingConfig, EmbeddingService } from '../types';
import { DEFAULT_EMBEDDING_CONFIG } from '../types';

/**
 * 嵌入服务
 */
export class OpenAIEmbeddingService implements EmbeddingService {
    private embeddings: OpenAIEmbeddings;
    private config: EmbeddingConfig;

    constructor(config?: Partial<EmbeddingConfig>) {
        this.config = { ...DEFAULT_EMBEDDING_CONFIG, ...config };

        this.embeddings = new OpenAIEmbeddings({
            model: process.env.EMBEDDING_MODEL,
            apiKey: process.env.API_KEY,
            configuration: {
                baseURL: process.env.BASE_URL,
            },
        });
    }

    /**
     * 获取单个文本的嵌入向量
     */
    async embedText(text: string): Promise<number[]> {
        if (!text || text.trim().length === 0) {
            throw new Error('Text cannot be empty');
        }

        try {
            const vector = await this.embeddings.embedQuery(text.trim());
            return vector;
        } catch (error) {
            throw new Error(`Failed to embed text: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 批量获取文本的嵌入向量
     */
    async embedTexts(texts: string[]): Promise<number[][]> {
        if (!texts || texts.length === 0) {
            return [];
        }

        // 过滤空文本
        const validTexts = texts.map(t => t.trim()).filter(t => t.length > 0);

        if (validTexts.length === 0) {
            return [];
        }

        try {
            const vectors = await this.embeddings.embedDocuments(validTexts);
            return vectors;
        } catch (error) {
            throw new Error(`Failed to embed texts: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * 获取向量维度
     */
    getDimensions(): number {
        return this.config.dimensions;
    }

    /**
     * 获取模型名称
     */
    getModel(): string {
        return this.config.model;
    }

    /**
     * 获取服务地址
     */
    getBaseUrl(): string {
        return this.config.baseUrl;
    }
}

/**
 * 创建嵌入服务实例
 */
export function createOpenAIEmbeddingService(config?: Partial<EmbeddingConfig>): EmbeddingService {
    return new OpenAIEmbeddingService(config);
}
