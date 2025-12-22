/**
 * Provider Registry
 *
 * Manages registration and retrieval of data providers.
 * Enables switching between different provider implementations.
 */

import { IDataProvider, ProviderFactory } from './types';

export class ProviderRegistry {
    private factories: Map<string, ProviderFactory> = new Map();
    private instances: Map<string, IDataProvider> = new Map();
    private defaultProvider: string | null = null;

    /**
     * Register a provider factory
     */
    register(name: string, factory: ProviderFactory): void {
        this.factories.set(name, factory);
    }

    /**
     * Create and retrieve a provider instance
     */
    async get(name: string, config?: Record<string, any>): Promise<IDataProvider> {
        // Return cached instance if available
        if (this.instances.has(name)) {
            return this.instances.get(name)!;
        }

        // Get factory
        const factory = this.factories.get(name);
        if (!factory) {
            throw new Error(`Provider '${name}' not found. Registered providers: ${Array.from(this.factories.keys()).join(', ')}`);
        }

        // Create new instance
        const instance = await factory.create(config || {});
        this.instances.set(name, instance);
        return instance;
    }

    /**
     * Get default provider instance
     */
    async getDefault(config?: Record<string, any>): Promise<IDataProvider> {
        if (!this.defaultProvider) {
            throw new Error('No default provider set');
        }
        return this.get(this.defaultProvider, config);
    }

    /**
     * Set the default provider
     */
    setDefault(name: string): void {
        if (!this.factories.has(name)) {
            throw new Error(`Provider '${name}' not registered`);
        }
        this.defaultProvider = name;
    }

    /**
     * List all registered provider names
     */
    list(): string[] {
        return Array.from(this.factories.keys());
    }

    /**
     * Check if a provider is registered
     */
    has(name: string): boolean {
        return this.factories.has(name);
    }

    /**
     * Clear cached instance (forces recreation on next get)
     */
    clearCache(name?: string): void {
        if (name) {
            this.instances.delete(name);
        } else {
            this.instances.clear();
        }
    }
}

// Global registry instance
export const globalRegistry = new ProviderRegistry();
