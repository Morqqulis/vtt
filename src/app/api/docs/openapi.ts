const NewsPromptSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Unique identifier for the news prompt'
    },
    category: {
      type: 'string',
      enum: ['general', 'world', 'nation', 'business', 'technology', 'entertainment', 'sports', 'science', 'health'],
      description: 'Category of the news prompt'
    },
    content: {
      type: 'string',
      description: 'Content of the news prompt'
    },
    isActive: {
      type: 'boolean',
      description: 'Whether the news prompt is active'
    },
    lastModified: {
      type: 'string',
      format: 'date-time',
      description: 'Last modification timestamp'
    }
  },
  required: ['id', 'category', 'content', 'isActive', 'lastModified']
};

const StationSchema = {
  type: 'object',
  properties: {
    newsPrompts: {
      type: 'array',
      items: NewsPromptSchema,
      description: 'Array of news prompts for different categories'
    }
  }
};

export const openApiDocument = {
  paths: {
    '/api/stations': {
      post: {
        requestBody: {
          content: {
            'application/json': {
              schema: StationSchema
            }
          }
        }
      }
    },
    '/api/stations/{id}': {
      put: {
        requestBody: {
          content: {
            'application/json': {
              schema: StationSchema
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      NewsPrompt: NewsPromptSchema,
      Station: StationSchema
    }
  }
}; 