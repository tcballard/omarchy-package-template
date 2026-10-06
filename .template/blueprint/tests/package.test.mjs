import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {root} from '../scripts/template.mjs';

test('authored local recipe stages only its executable and licence',()=>{
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'omarchy-package-'));
  try {
    const source=path.join(temp,'source');const stage=path.join(temp,'stage');
    fs.mkdirSync(source);fs.mkdirSync(stage);
    const recipe=path.join(root,'pkgbuilds/@@SLUG@@');
    for(const f of ['payload.sh','LICENSE'])fs.copyFileSync(path.join(recipe,f),path.join(source,f));
    const result=spawnSync('bash',['-euo','pipefail','-c','source "$1"; check; package','fixture',path.join(recipe,'PKGBUILD')],{env:{...process.env,srcdir:source,pkgdir:stage},encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
    const executable=path.join(stage,'usr/bin/@@SLUG@@');
    const run=spawnSync(executable,['--version'],{encoding:'utf8'});
    assert.equal(run.status,0);assert.equal(run.stdout.trim(),'@@SLUG@@ 0.1.0');
    assert(fs.existsSync(path.join(stage,'usr/share/licenses/@@SLUG@@/LICENSE')));
  }finally{fs.rmSync(temp,{recursive:true,force:true});}
});
