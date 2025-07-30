/**
 * Generates a unique timestamp-based identifier
 * @returns {string} Timestamp in milliseconds
 */
export function generateTimestamp(): string {
  return Date.now().toString();
}

/**
 * Generates a unique client name with timestamp
 * @param prefix - The prefix for the client name
 * @returns {string} Unique client name with timestamp
 */
export function generateUniqueClientName(prefix: string = 'Testing PW Clients'): string {
  const timestamp = generateTimestamp();
  return `${prefix} ${timestamp}`;
}

/**
 * Generates a unique entity name with timestamp
 * @param prefix - The prefix for the entity name
 * @returns {string} Unique entity name with timestamp
 */
export function generateUniqueEntityName(prefix: string = 'Testing PW Entity'): string {
  const timestamp = generateTimestamp();
  return `${prefix} ${timestamp}`;
}

/**
 * Waits for a specified amount of time
 * @param ms - Milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generates test data for client creation
 */
export function generateClientTestData() {
  const timestamp = generateTimestamp();
  return {
    name: `Testing PW Clients ${timestamp}`,
    type: 'Intermediary',
    timestamp
  };
}

/**
 * Generates test data for entity creation
 */
export function generateEntityTestData(clientName: string) {
  const timestamp = generateTimestamp();
  return {
    name: `Testing PW Entity ${timestamp}`,
    clientName,
    type: 'Corporate',
    remarks: 'MCP testing',
    timestamp
  };
}
