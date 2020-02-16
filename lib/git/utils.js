import Git from 'nodegit';

export async function gitCheckAndInit(projectPath) {
  try {
    await Git.Repository.open(`${projectPath}/.git`);
    console.log('ALREADY INITIALIZED', projectPath); // TODO: use `debug` module
  } catch (err) {
    if (err.errno === Git.Error.CODE.ENOTFOUND) {
      const repo = await Git.Repository.init(`${projectPath}/.git`, 0);
      console.log('REPO CREATED', repo); // TODO: use `debug` module
    } else {
      throw err;
    }
  }
}

export async function gitStatus(repo) {
  const statuses = await repo.getStatus();
  const state = {
    modified: [],
    new: [],
    deleted: [],
  };

  statuses.forEach(file => {
    if (file.isModified()) {
      state.modified.push(file.path());
    } else if (file.isNew()) {
      state.new.push(file.path());
    } else if (file.isDeleted()) {
      state.deleted.push(file.path());
    }
  });
  return state;
}

export async function gitCommit(projectPath, commitMessage, userEmail) {
  try {
    const repo = await Git.Repository.open(`${projectPath}/.git`);
    const index = await repo.refreshIndex();
    await index.addAll();
    await index.write();
    const oid = await index.writeTree();

    // Fetching parents to create commit
    const headCommit = await repo.getHeadCommit();
    // If no commit yet, parents is an empty array
    let parents = [];
    if (headCommit) {
      const head = await Git.Reference.nameToId(repo, 'HEAD');
      const parent = await repo.getCommit(head);
      parents = [parent];
    }

    // Using logged in user email as signature's name and email
    // Can be changed later on when the collaboration platform is in place
    const signature = await Git.Signature.now(userEmail, userEmail);

    await repo.createCommit(
      'HEAD',
      signature,
      signature,
      commitMessage,
      oid,
      parents
    );
    return 0; // TODO Return the id
  } catch (err) {
    // TODO Handle error to display to the user
    console.error(err);
    return;
  }
}

export async function gitAddRemote(projectPath, remoteName, remoteUrl) {
  try {
    const repo = await Git.Repository.open(`${projectPath}/.git`);
    return await Git.Remote.create(repo, remoteName, remoteUrl);
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
}

export async function getRemote(projectPath, remoteName) {
  const repo = await Git.Repository.open(`${projectPath}/.git`);
  let remotes = await repo.getRemotes();
  for (let i = 0; i < remotes.length; i++) {
    if (remotes[i].name() == remoteName) {
      return remotes[i];
    }
  }
  return null;
}

export async function gitPush(projectPath, remoteName, localBranch, remoteBranch) {
  const repo = await Git.Repository.open(`${projectPath}/.git`);
  const remote = await repo.getRemote(remoteName);
  return await remote.push(
    [`refs/heads/${localBranch}:refs/heads/${remoteBranch}`],
    {
      callbacks: {
          credentials: function(url, userName) {
              return Git.Cred.userpassPlaintextNew(process.env.GITHUB_USER, process.env.GITHUB_TOKEN);
          }
      }
  });
}

export async function gitFetch(projectPath) {
  const repo = await Git.Repository.open(`${projectPath}/.git`);
  return await repo.fetchAll(
    {
      callbacks: {
          credentials: function(url, userName) {
              return Git.Cred.userpassPlaintextNew(process.env.GITHUB_USER, process.env.GITHUB_TOKEN);
          },
          certificateCheck: function() {
            return 0;
          }
      }
  });
}

export async function gitMerge(projectPath, branch, mergeBranch) {
  const repo = await Git.Repository.open(`${projectPath}/.git`);
  return await repo.mergeBranches(branch, mergeBranch);
}

export async function gitPull(projectPath, remoteName, localBranch, remoteBranch) {
  await gitFetch(projectPath);
  await gitMerge(projectPath, localBranch, `${remoteName}/${remoteBranch}`);
}

export async function gitClone(remoteUrl, projectPath) {
  return await Git.Clone.clone(remoteUrl, projectPath, {
    fetchOpts: {
      callbacks: {
          credentials: function(url, userName) {
              return Git.Cred.userpassPlaintextNew(process.env.GITHUB_USER, process.env.GITHUB_TOKEN);
          }
      }
    }
  });
}