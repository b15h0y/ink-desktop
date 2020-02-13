import * as userStore from '../lib/store/user-store';
import * as projectStore from '../lib/store/project-store';
import { initProject, commitProject, getProjectState, cloneProject } from '../lib/project';
import { gitPush, gitPull } from '../lib/git/utils';
import { ParserManager } from '../lib/parser';
import { getById } from '../lib/store/project-store';
import { openProject } from '../lib/project-daw';

const handlers = new Map();
function registerHandler(event, handler) {
  handlers.set(event, handler);
}
export async function handleRequest(event, data) {
  if (handlers.has(event) && typeof handlers.get(event) === 'function') {
    return handlers.get(event)(data);
  }
  // FIXME: what if there is no handler registered?
}

registerHandler('fetch-user', () => userStore.get());
registerHandler('set-user', ({ email }) => {
  const user = new userStore.User(email);
  return userStore.set(user);
});

registerHandler('fetch-projects', () => projectStore.list());
registerHandler('delete-project', projectId => projectStore.remove(projectId));
registerHandler('reset-projects', () => projectStore.reset());
registerHandler(
  'add-project',
  async projectPath => await initProject(projectPath)
);
registerHandler(
  'get-project-state',
  async projectId => await getProjectState(projectId)
);
registerHandler('commit-project', async ({ projectId, commitMessage }) => {
  const user = userStore.get();
  return await commitProject(projectId, commitMessage, user.email);
});
registerHandler('push-project', async ({ projectId }) => {
  const project = getById(projectId);
  await gitPush(project.path, 'origin', 'master', 'master');
});
registerHandler('pull-project', async ({ projectId }) => {
  const project = getById(projectId);
  await gitPull(project.path, 'origin', 'master', 'master');
  await ParserManager.resetInstance(projectId);
});
registerHandler(
  'clone-project',
  async ({ remoteUrl, projectFolder }) => await cloneProject(remoteUrl, projectFolder)
);
registerHandler(
  'open-project',
  async projectId => await openProject(projectId)
);
