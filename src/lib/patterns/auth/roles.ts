// Use when the user asks for role-based access control (e.g. admin vs user).
// This is a generic pattern; how you store roles/claims is up to your app.

export type Role = string;

export interface AccessRule {
	anyOf?: Role[];
	allOf?: Role[];
}

export function hasRole(
	userRoles: readonly Role[] | null | undefined,
	required: Role | Role[]
): boolean {
	if (!userRoles || userRoles.length === 0) return false;
	const requiredRoles = Array.isArray(required) ? required : [required];
	return requiredRoles.some((role) => userRoles.includes(role));
}

export function canAccessRoute(
	userRoles: readonly Role[] | null | undefined,
	rule: AccessRule | undefined
): boolean {
	if (!rule) return true;
	if (!userRoles || userRoles.length === 0) return false;

	const { anyOf, allOf } = rule;

	if (anyOf && !anyOf.some((role) => userRoles.includes(role))) {
		return false;
	}

	if (allOf && !allOf.every((role) => userRoles.includes(role))) {
		return false;
	}

	return true;
}
