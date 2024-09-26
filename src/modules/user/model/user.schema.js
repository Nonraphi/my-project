export const UserModels = {
    id: { type: 'INT', required: false },
    u_name: { type: 'VARCHAR', length: 50, required: true },
    u_birth_date: { type: 'DATE', required: false }
};

export const TableName = "users"

